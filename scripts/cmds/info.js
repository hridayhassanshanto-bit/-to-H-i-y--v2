const moment = require("moment-timezone");

let videoIndex = 0;

const videos = [
  "https://files.catbox.moe/8f2fc5.mp4",
  "https://files.catbox.moe/3aikdw.mp4"
];

module.exports = {
  config: {
    name: "info",
    version: "5.2.0",
    author: "হৃদয় হাসান শান্ত",
    role: 0,
    countDown: 20,

    shortDescription: {
      en: "Bot & owner information"
    },

    longDescription: {
      en: "Shows stylish bot, owner, group and system information"
    },

    category: "owner",

    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, api }) {
    try {

      // ─────────────────────────────────────────
      // COMMAND COUNT
      // ─────────────────────────────────────────

      const totalCommands =
        global.GoatBot?.commands?.size || 0;

      // ─────────────────────────────────────────
      // DATE & TIME
      // ─────────────────────────────────────────

      const now = moment().tz("Asia/Kuala_Lumpur");

      const date = now.format("MMMM Do YYYY");
      const time = now.format("h:mm:ss A");

      // ─────────────────────────────────────────
      // UPTIME
      // ─────────────────────────────────────────

      const uptime = process.uptime();

      const days = Math.floor(uptime / 86400);
      const hours = Math.floor((uptime % 86400) / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);

      const uptimeString =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // ─────────────────────────────────────────
      // PREFIX
      // ─────────────────────────────────────────

      let prefix = "/";

      try {
        prefix =
          global.utils.getPrefix(event.threadID) || "/";
      } catch (error) {
        prefix = "/";
      }

      // ─────────────────────────────────────────
      // GROUP NAME
      // ─────────────────────────────────────────

      const groupName =
        event.threadName || "Unknown Group";

      // ─────────────────────────────────────────
      // BOT NAME
      // ─────────────────────────────────────────

      let botName = "GodV2 Bot";

      try {
        const botID = api.getCurrentUserID();
        const botInfo = await api.getUserInfo(botID);

        botName =
          botInfo?.[botID]?.name || "GodV2 Bot";
      } catch (error) {
        botName = "GodV2 Bot";
      }

      // ─────────────────────────────────────────
      // INFO MESSAGE
      // ─────────────────────────────────────────

      const body = `

╭━━━━━━━━━━━━━━━━━━━━━━╮
┃ 👑 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 👑
╰━━━━━━━━━━━━━━━━━━━━━━╯

👑 ╭─❖ 𝐎𝐖𝐍𝐄𝐑 ❖─╮
╰➤ 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎

🤖 ╭─❖ 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 ❖─╮
╰➤ ${botName}

🧑 ╭─❖ 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 ❖─╮
╰➤ 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎

🎂 ╭─❖ 𝐀𝐆𝐄 ❖─╮
╰➤ 𝟐𝟏+

🚻 ╭─❖ 𝐆𝐄𝐍𝐃𝐄𝐑 ❖─╮
╰➤ 𝐌𝐀𝐋𝐄

☪ ╭─❖ 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 ❖─╮
╰➤ 𝐈𝐒𝐋𝐀𝐌

🌐 ╭─❖ 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 ❖─╮
╰➤ 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎

👥 ╭─❖ 𝐆𝐑𝐎𝐔𝐏 ❖─╮
╰➤ ${groupName}

⚙️ ╭─❖ 𝐏𝐑𝐄𝐅𝐈𝐗 ❖─╮
╰➤ ${prefix}

💬 ╭─❖ 𝐇𝐄𝐋𝐏 ❖─╮
╰➤ ${prefix}help2

📦 ╭─❖ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ❖─╮
╰➤ ${totalCommands}

⏳ ╭─❖ 𝐔𝐏𝐓𝐈𝐌𝐄 ❖─╮
╰➤ ${uptimeString}

🕒 ╭─❖ 𝐓𝐈𝐌𝐄 ❖─╮
╰➤ ${time}

📅 ╭─❖ 𝐃𝐀𝐓𝐄 ❖─╮
╰➤ ${date}

🌏 ╭─❖ 𝐓𝐈𝐌𝐄𝐙𝐎𝐍𝐄 ❖─╮
╰➤ 𝐀𝐒𝐈𝐀 / 𝐊𝐔𝐀𝐋𝐀 𝐋𝐔𝐌𝐏𝐔𝐑

🏠 ╭─❖ 𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 ❖─╮
╰➤ 𝐌𝐀𝐋𝐀𝐘𝐒𝐈𝐀

💔 ╭─❖ 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏 ❖─╮
╰➤ 𝐒𝐈𝐍𝐆𝐋𝐄

🛠 ╭─❖ 𝐖𝐎𝐑𝐊 ❖─╮
╰➤ 𝐅𝐎𝐑𝐄𝐈𝐆𝐍 𝐉𝐎𝐁

━━━━━━━━━━━━━━━━━━━━━━
💠 𝐆𝐎𝐃𝐕𝟐 • 𝐁𝐎𝐓 𝐒𝐘𝐒𝐓𝐄𝐌
💠 𝐃𝐄𝐕: 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎
━━━━━━━━━━━━━━━━━━━━━━
`;

      // ─────────────────────────────────────────
      // EMPTY VIDEO LIST CHECK
      // ─────────────────────────────────────────

      if (
        !Array.isArray(videos) ||
        videos.length === 0
      ) {
        console.warn(
          "[INFO] Video list is empty. Sending text only."
        );

        return await message.reply({
          body:
            body +
            "\n\n⚠️ 𝐍𝐨 𝐯𝐢𝐝𝐞𝐨 𝐢𝐬 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐫𝐢𝐠𝐡𝐭 𝐧𝐨𝐰।"
        });
      }

      // ─────────────────────────────────────────
      // SAFE VIDEO INDEX
      // ─────────────────────────────────────────

      if (
        !Number.isInteger(videoIndex) ||
        videoIndex < 0 ||
        videoIndex >= videos.length
      ) {
        videoIndex = 0;
      }

      const videoLink = videos[videoIndex];

      // Move to next video
      videoIndex =
        (videoIndex + 1) % videos.length;

      // ─────────────────────────────────────────
      // INVALID VIDEO URL CHECK
      // ─────────────────────────────────────────

      if (
        typeof videoLink !== "string" ||
        !videoLink.trim()
      ) {
        console.warn(
          "[INFO] Invalid video URL. Sending text only."
        );

        return await message.reply({
          body:
            body +
            "\n\n⚠️ 𝐕𝐢𝐝𝐞𝐨 𝐔𝐑𝐋 𝐢𝐬 𝐢𝐧𝐯𝐚𝐥𝐢𝐝।"
        });
      }

      // ─────────────────────────────────────────
      // TRY SEND VIDEO
      // ─────────────────────────────────────────

      try {

        const stream =
          await global.utils.getStreamFromURL(
            videoLink
          );

        if (!stream) {
          throw new Error(
            "Video stream is empty"
          );
        }

        return await message.reply({
          body,
          attachment: stream
        });

      } catch (videoError) {

        console.error(
          "[INFO] Video sending failed:",
          videoError
        );

        // Video fallback → text only
        return await message.reply({
          body:
            body +
            "\n\n⚠️ 𝐕𝐢𝐝𝐞𝐨 𝐬𝐞𝐧𝐝𝐢𝐧𝐠 𝐟𝐚𝐢𝐥𝐞𝐝।" +
            "\n💬 𝐈𝐧𝐟𝐨 𝐭𝐞𝐱𝐭 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲 𝐬𝐞𝐧𝐭।"
        });
      }

    } catch (error) {

      console.error(
        "[INFO COMMAND ERROR]",
        error
      );

      return message.reply(
        `❌ 𝐈𝐍𝐅𝐎 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐄𝐑𝐑𝐎𝐑

⚠️ 𝐈𝐧𝐟𝐨 𝐬𝐞𝐧𝐝 𝐤𝐨𝐫𝐚𝐫 𝐬𝐨𝐦𝐚𝐬𝐬𝐲𝐚 𝐡𝐨𝐲𝐞𝐜𝐡𝐞।
🔄 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧।`
      );
    }
  }
};

এতে "videos = []" হলেও আর "videos[videoIndex]" থেকে "undefined" নিয়ে "getStreamFromURL()" কল হবে না। ভিডিও list খালি, URL invalid, বা video download/send—তিন ক্ষেত্রেই text-only fallback কাজ করবে।
