const fs = require("fs-extra");
const moment = require("moment-timezone");

const getStreamFromURL = global.utils.getStreamFromURL;

// ═══════════════════════════════════════════════
// 🩸⃝ NIJHUM BOT — PREFIX VIDEO LIST
// 👑 ADMIN / DEVELOPER: HRIDOY HASAN SHANTO
// ═══════════════════════════════════════════════

const gifList = [
	"https://files.catbox.moe/7dsuqc.mp4",
	"https://files.catbox.moe/6e97aj.mp4"
];

// ✅ Per-thread video toggle storage
global.GoatBot.prefixVideoToggle =
	global.GoatBot.prefixVideoToggle || {};

module.exports = {
	config: {
		name: "prefix",
		version: "3.0.0",
		author: "HRIDOY HASAN SHANTO",
		countDown: 5,
		role: 0,
		description: "Change & show bot prefix",
		category: "config"
	},

	langs: {
		en: {
			usage:
				"❌ 𝐔𝐬𝐚𝐠𝐞: 𝐩𝐫𝐞𝐟𝐢𝐱 <𝐧𝐞𝐰> | 𝐩𝐫𝐞𝐟𝐢𝐱 𝐫𝐞𝐬𝐞𝐭 | 𝐩𝐫𝐞𝐟𝐢𝐱 <𝐧𝐞𝐰> -g",

			reset:
				"✅ 𝐏𝐑𝐄𝐅𝐈𝐗 𝐑𝐄𝐒𝐄𝐓 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!\n🔰 𝐒𝐘𝐒𝐓𝐄𝐌: %1",

			onlyAdmin:
				"⛔ 𝐎𝐍𝐋𝐘 𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍 𝐂𝐀𝐍 𝐂𝐇𝐀𝐍𝐆𝐄 𝐆𝐋𝐎𝐁𝐀𝐋 𝐏𝐑𝐄𝐅𝐈𝐗.",

			confirmGlobal:
				"⚠️ 𝐆𝐋𝐎𝐁𝐀𝐋 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄?\n👉 𝐑𝐄𝐀𝐂𝐓 𝐓𝐎 𝐂𝐎𝐍𝐅𝐈𝐑𝐌 ✅",

			confirmThisThread:
				"⚠️ 𝐆𝐑𝐎𝐔𝐏 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄?\n👉 𝐑𝐄𝐀𝐂𝐓 𝐓𝐎 𝐂𝐎𝐍𝐅𝐈𝐑𝐌 ✅",

			successGlobal:
				"✅ 𝐆𝐋𝐎𝐁𝐀𝐋 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃!\n🆕 %1",

			successThisThread:
				"✅ 𝐆𝐑𝐎𝐔𝐏 𝐏𝐑𝐄𝐅𝐈𝐗 𝐂𝐇𝐀𝐍𝐆𝐄𝐃!\n🆕 %1"
		}
	},

	// ═══════════════════════════════════════════════
	// 🔰 PREFIX COMMAND
	// ═══════════════════════════════════════════════

	onStart: async function ({
		message,
		role,
		args,
		commandName,
		event,
		threadsData,
		getLang
	}) {
		if (!args[0]) {
			return message.reply(getLang("usage"));
		}

		// 🔄 Reset prefix
		if (args[0].toLowerCase() === "reset") {
			await threadsData.set(
				event.threadID,
				null,
				"data.prefix"
			);

			return message.reply(
				getLang("reset", global.GoatBot.config.prefix)
			);
		}

		const newPrefix = args[0];
		const setGlobal = args[1] === "-g";

		// 👑 Global prefix requires admin
		if (setGlobal && role < 2) {
			return message.reply(getLang("onlyAdmin"));
		}

		const confirmMsg = setGlobal
			? getLang("confirmGlobal")
			: getLang("confirmThisThread");

		try {
			const attachment = await getStreamFromURL(gifList[0]);

			message.reply(
				{
					body:
						`🩸⃝ 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 🩸⃝\n\n` +
						confirmMsg +
						`\n\n╭━━━━━━━⛓️━━━━━━━╮\n` +
						`👑 𝐀𝐃𝐌𝐈𝐍\n` +
						`🖤 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎\n` +
						`╰━━━━━━━⛓️━━━━━━━╯\n` +
						`⚔️ 𝐎𝐖𝐍𝐄𝐑 • 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 ⚔️`,
					attachment
				},
				(err, info) => {
					if (err || !info) return;

					global.GoatBot.onReaction.set(
						info.messageID,
						{
							commandName,
							author: event.senderID,
							newPrefix,
							setGlobal
						}
					);
				}
			);
		} catch (err) {
			console.error("PREFIX VIDEO ERROR:", err);

			message.reply(
				`🩸⃝ 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 🩸⃝\n\n` +
				confirmMsg +
				`\n\n⚠️ 𝐕𝐈𝐃𝐄𝐎 𝐒𝐄𝐍𝐃 𝐅𝐀𝐈𝐋𝐄𝐃.\n` +
				`🔧 𝐏𝐋𝐄𝐀𝐒𝐄 𝐂𝐎𝐍𝐅𝐈𝐑𝐌 𝐕𝐈𝐃𝐄𝐎 𝐔𝐑𝐋.`
			);
		}
	},

	// ═══════════════════════════════════════════════
	// 🔥 REACTION CONFIRMATION
	// ═══════════════════════════════════════════════

	onReaction: async function ({
		event,
		message,
		threadsData,
		Reaction,
		getLang
	}) {
		if (!Reaction) return;

		if (event.userID !== Reaction.author) return;

		global.GoatBot.onReaction.delete(event.messageID);

		// 🌍 Global prefix
		if (Reaction.setGlobal) {
			global.GoatBot.config.prefix = Reaction.newPrefix;

			try {
				fs.writeFileSync(
					global.client.dirConfig,
					JSON.stringify(
						global.GoatBot.config,
						null,
						2
					)
				);
			} catch (err) {
				console.error("PREFIX CONFIG SAVE ERROR:", err);
			}

			return message.reply(
				`🩸⃝ 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 🩸⃝\n\n` +
				getLang(
					"successGlobal",
					Reaction.newPrefix
				) +
				`\n\n╭━━━━━━━⛓️━━━━━━━╮\n` +
				`👑 𝐀𝐃𝐌𝐈𝐍\n` +
				`🖤 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎\n` +
				`╰━━━━━━━⛓️━━━━━━━╯`
			);
		}

		// 👥 Thread prefix
		await threadsData.set(
			event.threadID,
			Reaction.newPrefix,
			"data.prefix"
		);

		return message.reply(
			`🩸⃝ 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 🩸⃝\n\n` +
			getLang(
				"successThisThread",
				Reaction.newPrefix
			) +
			`\n\n╭━━━━━━━⛓️━━━━━━━╮\n` +
			`👑 𝐀𝐃𝐌𝐈𝐍\n` +
			`🖤 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎\n` +
			`╰━━━━━━━⛓️━━━━━━━╯`
		);
	},

	// ═══════════════════════════════════════════════
	// 🩸 NO-PREFIX "prefix"
	// ═══════════════════════════════════════════════

	onChat: async function ({
		event,
		message,
		threadsData
	}) {
		if (
			!event.body ||
			event.body.trim().toLowerCase() !== "prefix"
		) {
			return;
		}

		const threadID = event.threadID;

		// 🔄 Toggle video 0 → 1 → 0 → 1
		if (
			global.GoatBot.prefixVideoToggle[threadID] === undefined
		) {
			global.GoatBot.prefixVideoToggle[threadID] = 0;
		}

		const index =
			global.GoatBot.prefixVideoToggle[threadID];

		global.GoatBot.prefixVideoToggle[threadID] =
			index === 0 ? 1 : 0;

		// 🎬 Select video safely
		const videoURL = gifList[index];

		let videoStream = null;

		try {
			videoStream = await getStreamFromURL(videoURL);
		} catch (err) {
			console.error("PREFIX VIDEO ERROR:", err);
		}

		const systemPrefix =
			global.GoatBot.config.prefix;

		const groupPrefix =
			global.utils.getPrefix(threadID);

		let threadInfo;

		try {
			threadInfo = await threadsData.get(threadID);
		} catch (err) {
			threadInfo = null;
		}

		const groupName =
			threadInfo?.threadName || "Unknown Group";

		// 🇲🇾 Malaysia Time
		const time = moment()
			.tz("Asia/Kuala_Lumpur")
			.format("hh:mm A");

		const date = moment()
			.tz("Asia/Kuala_Lumpur")
			.format("DD MMM YYYY");

		const owner =
			"𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎";

		const body =
`🩸⃝ 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 🩸⃝

╭━━━━━━━⛓️━━━━━━━╮
👑 𝐀𝐃𝐌𝐈𝐍
🖤 ${owner}
╰━━━━━━━⛓️━━━━━━━╯

⚔️ 𝐎𝐖𝐍𝐄𝐑 • 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑 ⚔️

╭━━━━━━━━━━━━━━━━╮
🏷️ 𝐆𝐑𝐎𝐔𝐏: ${groupName}
🔰 𝐒𝐘𝐒𝐓𝐄𝐌: ${systemPrefix}
💬 𝐆𝐑𝐎𝐔𝐏: ${groupPrefix}
⏰ 𝐓𝐈𝐌𝐄: ${time}
📅 𝐃𝐀𝐓𝐄: ${date}
⚡ 𝐒𝐓𝐀𝐓𝐔𝐒: 𝐎𝐍𝐋𝐈𝐍𝐄
╰━━━━━━━━━━━━━━━━╯

🩸⃝ 𝐍𝐈𝐉𝐇𝐔𝐌 𝐁𝐎𝐓 🩸⃝`;

		const replyData = {
			body
		};

		// 🎬 Attach video only if successfully loaded
		if (videoStream) {
			replyData.attachment = videoStream;
		}

		return message.reply(replyData);
	}
};
