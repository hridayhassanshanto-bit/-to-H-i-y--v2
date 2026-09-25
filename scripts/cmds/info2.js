/**
 * ╔══════════════════════════════════════════════╗
 * ║              NIJHUM BOT — INFO2             ║
 * ║          Developer: হৃদয় হাসান শান্ত        ║
 * ║                 Version: 6.0.0              ║
 * ╚══════════════════════════════════════════════╝
 */

const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info2",
    version: "6.0.0",
    author: "হৃদয় হাসান শান্ত",
    role: 0,
    countDown: 10,
    shortDescription: {
      en: "Show NIJHUM bot information"
    },
    longDescription: {
      en: "Displays bot, owner, system and contact information"
    },
    category: "owner"
  },

  onStart: async function ({ message }) {
    // ═══════════════════════════════════════════
    // 🤖 BOT SETTINGS
    // ═══════════════════════════════════════════

    const botName = "𝐍𝐈𝐉𝐇𝐔𝐌";

    const prefix =
      global.GoatBot?.config?.prefix ||
      global.GoatBot?.config?.PREFIX ||
      ".";

    const commands =
      global.GoatBot?.commands?.size ||
      global.GoatBot?.commands?.length ||
      0;

    // ═══════════════════════════════════════════
    // 🕒 TIME / DATE
    // ═══════════════════════════════════════════

    const now = moment().tz("Asia/Kuala_Lumpur");

    const time = now.format("hh:mm:ss A");
    const date = now.format("DD MMMM YYYY");

    // ═══════════════════════════════════════════
    // ⏱️ UPTIME
    // ═══════════════════════════════════════════

    const uptime = process.uptime();

    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    const uptimeText = `${h}h ${m}m ${s}s`;

    // ═══════════════════════════════════════════
    // 🖼️ IMAGE TOGGLE
    // ═══════════════════════════════════════════

    const images = [
      "https://i.imgur.com/5vVNjCa.jpeg",
      "https://i.imgur.com/xJSTrIR.jpeg"
    ];

    if (!Array.isArray(images) || images.length === 0) {
      return message.reply(getInfoText());
    }

    if (
      typeof global.info2ImageIndex !== "number" ||
      global.info2ImageIndex >= images.length
    ) {
      global.info2ImageIndex = 0;
    }

    const selectedImage = images[global.info2ImageIndex];

    // Next image for next command
    global.info2ImageIndex =
      (global.info2ImageIndex + 1) % images.length;

    // ═══════════════════════════════════════════
    // 📋 INFO TEXT
    // ═══════════════════════════════════════════

    const body = getInfoText();

    // ═══════════════════════════════════════════
    // 🖼️ SEND IMAGE
    // ═══════════════════════════════════════════

    try {
      const stream =
        await global.utils.getStreamFromURL(selectedImage);

      if (!stream) {
        throw new Error("Image stream unavailable");
      }

      return message.reply({
        body,
        attachment: stream
      });

    } catch (error) {
      console.error(
        "[INFO2] Image send error:",
        error.message
      );

      // Fallback: send text without image
      return message.reply(body);
    }

    // ═══════════════════════════════════════════
    // 📝 INFO TEMPLATE
    // ═══════════════════════════════════════════

    function getInfoText() {
      return `╔════════════════════╗
     👑 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 👑
╚════════════════════╝

╭〔 🤖 ‿𝐁𝐎𝐓 𝐈𝐍𝐅𝐎 〕╮
│ 🤖 ‿𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 ➤
│        ${botName}
│ ⚡ ‿𝐏𝐑𝐄𝐅𝐈𝐗 ➤ ${prefix}
│ 📦 ‿𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ➤ ${commands}
╰──────────────────╯

╭〔 👑 ‿𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 〕╮
│ 👑 ‿𝐍𝐀𝐌𝐄 ➤
│ 💠 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎
│ 🎂 ‿𝐀𝐆𝐄 ➤ 𝟐𝟏+
│ 💼 ‿𝐖𝐎𝐑𝐊 ➤
│ 🌍     ‿𝐅𝐎𝐑𝐄𝐈𝐆𝐍 𝐉𝐎𝐁
│ 🚹 ‿𝐆𝐄𝐍𝐃𝐄𝐑 ➤ 𝐌𝐀𝐋𝐄
│ 💔 ‿𝐒𝐓𝐀𝐓𝐔𝐒 ➤
│ 🧑‍🦱     ‿𝐒𝐈𝐍𝐆𝐋𝐄 𝐁𝐎𝐘
╰──────────────────╯

╭〔 📍 ‿𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 〕╮
│ 🏠 ‿𝐃𝐈𝐒𝐓𝐑𝐈𝐂𝐓 ➤
│ 👉      ‿𝐁𝐎𝐆𝐔𝐑𝐀
│ 🌍 ‿𝐂𝐔𝐑𝐑𝐄𝐍𝐓 ➤
│ 🇲🇾      ‿𝐌𝐀𝐋𝐀𝐘𝐒𝐈𝐀
╰──────────────────╯

╭〔 🧬 ‿𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋 〕╮
│ 👑 ‿𝐍𝐈𝐂𝐊𝐍𝐀𝐌𝐄 ➤
│ 💠      ‿𝐇𝐑𝐈𝐃𝐎𝐘
│ 🎤 ‿𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 ➤
│ 🎶      ‿𝐒𝐈𝐍𝐆𝐄𝐑 𝐁𝐎𝐘
│ 💞 ‿𝐒𝐓𝐀𝐓𝐔𝐒 ➤
│ 🖤      ‿𝐒𝐈𝐍𝐆𝐋𝐄
╰──────────────────╯

╭─〔 🎯 ‿𝐇𝐎𝐁𝐁𝐈𝐄𝐒 〕─╮
│ 🔥 ➤ ‿𝐅𝐑𝐈𝐄𝐍𝐃𝐒 𝐀𝐃𝐃𝐀
│ 🏍️ ➤ ‿𝐁𝐈𝐊𝐄 𝐑𝐈𝐃𝐄
│ 📱 ➤ ‿𝐌𝐎𝐁𝐈𝐋𝐄 𝐔𝐒𝐄
│ 🎵 ➤ ‿𝐌𝐔𝐒𝐈𝐂
╰──────────────────╯

╭─〔 💠 ‿𝐁𝐑𝐀𝐍𝐃𝐈𝐍𝐆 〕─╮
│ 👑 ‿𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓
│ 💎 ‿𝐀𝐃𝐌𝐈𝐍 ➤
│     𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎
│ ⚜️ ‿𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 ➤
│     𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎
╰──────────────────╯

╔════════════════════╗
       ✡️ 𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄 ✡️
╚════════════════════╝

➤ 😎 আমি নিজের মতোই চলি
➤ 🔥 আমি কপি না
➤ ⚜️ আমি আলাদা
➤ 🖤 নিজের পরিচয় নিজেই তৈরি করি
➤ 💎 নিজের ব্র্যান্ড নিজের স্টাইলে

╭─〔 🌐 ‿𝐂𝐎𝐍𝐓𝐀𝐂𝐓 〕─╮
│ 🌐 ‿𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 ➤
│ https://www.facebook.com/share/1LDy7c49aK/
│
│ 📞 ‿𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 ➤
│ +601116710390
╰──────────────────╯

╭〔 ⏳ ‿𝐒𝐘𝐒𝐓𝐄𝐌 〕╮
│ 🕒 ‿𝐓𝐈𝐌𝐄 ➤ ${time}
│ 📅 ‿𝐃𝐀𝐓𝐄 ➤ ${date}
│ ⏱️ ‿𝐔𝐏𝐓𝐈𝐌𝐄 ➤
│ ✅      ${uptimeText}
╰──────────────────╯

╔════════════════════╗
 💠 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 💠
 👑 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎
╚════════════════════╝`;
    }
  }
};
