const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

cmd({
    pattern: "menu",
    desc: "Show interactive menu system",
    category: "menu",
    react: "🧾",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const menuCaption = `╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃◈╭──❍「 *USER INFO* 」❍
┃◈├• 👑 Owner : *${config.OWNER_NAME}*
┃◈├• 🤖 Baileys : *Multi Device*
┃◈├• 🖥️ Type : *NodeJs*
┃◈├• 🚀 Platform : *Heroku*
┃◈├• ⚙️ Mode : *[${config.MODE}]*
┃◈├• 🔣 Prefix : *[${config.PREFIX}]*
┃◈├• 🏷️ Version : *4.0.0 Bᴇᴛᴀ*
┃◈╰─┬─★─☆──♪♪─❍
┃◈╭─┴❍「 *BOT STATUS* 」❍
┃◈├• 📥 *Download Menu* - Media downloads
┃◈├• 👥 *Group Menu* - Group management
┃◈├• 🤣 *Fun Menu* - Entertainment
┃◈├• 👑 *Owner Menu* - Bot owner tools
┃◈├• 🤖 *AI Menu* - AI features
┃◈├• 🎎 *Anime Menu* - Anime content
┃◈├• ♻️ *Convert Menu* - File conversion
┃◈├• 📌 *Other Menu* - Utilities
┃◈├• 💔 *Reactions Menu* - Expressive actions
┃◈├• 🏫 *Main Menu* - Core commands
┃◈╰─┬─★─☆──♪♪─❍
┃◈╭─┴────────────●●►
┃◈├ ╔═╦═╗───╔══╗╔╗╔╗╔╗
┃◈├ ║║║║╠╦╦═╩╗╔╩╣╚╬╬╝║
┃◈├ ║║║║║╔╩══╣║╬║║║║║║
┃◈├ ╚╩═╩╩╝───╚╩═╩╩╩╩═╝
┃◈╰─┬────────────●●►
┃◈╭─┴────────────●●►
┃◈├•ʀᴇᴘʟʏ ᴛʜᴇ ɴᴜᴍʙᴇʀ sᴇʟᴇᴄᴛ
┃◈╰──────────────●●►
╰━━━〔 *FREE PALASTINE* 〕━━━┈⊷
> ${config.DESCRIPTION}`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363207624903731@newsletter',
                newsletterName: config.OWNER_NAME,
                serverMessageId: 143
            }
        };

        // Function to send menu video
        const sendMenuVideo = async () => {
            try {
                return await conn.sendMessage(
                    from,
                    {
                        video: { url: config.MENU_VIDEO_URL || 'https://files.catbox.moe/lnqhn4.mp4' },
                        caption: menuCaption,
                        contextInfo: contextInfo
                    },
                    { quoted: mek }
                );
            } catch (e) {
                console.log('Video send failed, falling back to text');
                return await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        };

        // Function to send menu audio with timeout
        const sendMenuAudio = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay after video
                await conn.sendMessage(from, {
                    audio: { url: 'https://github.com/Tohidkhan6332/TOHID-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
                    mimetype: 'audio/mp4',
                    ptt: true,
                }, { quoted: mek });
            } catch (e) {
                console.log('Audio send failed, continuing without it');
            }
        };

        // Send video first, then audio sequentially
        let sentMsg;
        try {
            // Send video with 15s timeout (videos may take longer to load)
            sentMsg = await Promise.race([
                sendMenuVideo(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Video send timeout')), 15000))
            ]);
            
            // Then send audio with 1s delay and 8s timeout
            await Promise.race([
                sendMenuAudio(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Audio send timeout')), 8000))
            ]);
        } catch (e) {
            console.log('Menu send error:', e);
            if (!sentMsg) {
                sentMsg = await conn.sendMessage(
                    from,
                    { text: menuCaption, contextInfo: contextInfo },
                    { quoted: mek }
                );
            }
        }
        
        const messageID = sentMsg.key.id;

        // Menu data (complete version)
        const menuData = {
            '1': {
                title: "📥 *Download Menu* 📥",
                content: `╭━━━〔 *Download Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  🌐 *Social Media*
┃◈├• • facebook [url]
┃◈├• • mediafire [url]
┃◈├•  • tiktok [url]
┃◈├•  • twitter [url]
┃◈├•  • Insta [url]
┃◈├•  • apk [app]
┃◈├•  • img [query]
┃◈├•  • tt2 [url]
┃◈├•  • pins [url]
┃◈├•  • apk2 [app]
┃◈├•  • fb2 [url]
┃◈├•  • pinterest [url]
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🎵 *Music/Video*
┃◈├•  • spotify [query]
┃◈├•  • play [song]
┃◈├•  • play2-10 [song]
┃◈├•  • audio [url]
┃◈├•  • video [url]
┃◈├•  • video2-10 [url]
┃◈├•  • ytmp3 [url]
┃◈├•  • ytmp4 [url]
┃◈├•  • song [name]
┃◈├•  • darama [name]
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '2': {
                title: "👥 *Group Menu* 👥",
                content: `╭━━━〔 *Group Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  🛠️ *Management*
┃◈├•  • grouplink
┃◈├•  • kickall
┃◈├•  • kickall2
┃◈├•  • kickall3
┃◈├•  • add @user
┃◈├•  • remove @user
┃◈├•  • kick @user
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  ⚡ *Admin Tools*
┃◈├•  • promote @user
┃◈├•  • demote @user
┃◈├•  • dismiss 
┃◈├•  • revoke
┃◈├•  • mute [time]
┃◈├•  • unmute
┃◈├•  • lockgc
┃◈├•  • unlockgc
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🏷️ *Tagging*
┃◈├•  • tag @user
┃◈├•  • hidetag [msg]
┃◈├•  • tagall
┃◈├•  • tagadmins
┃◈├•  • invite
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '3': {
                title: "😄 *Fun Menu* 😄",
                content: `╭━━━〔 *Fun Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  🎭 *Interactive*
┃◈├•  • shapar
┃◈├•  • rate @user
┃◈├•  • insult @user
┃◈├•  • hack @user
┃◈├•  • ship @user1 @user2
┃◈├•  • character
┃◈├•  • pickup
┃◈├•  • joke
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  😂 *Reactions*
┃◈├•  • hrt
┃◈├•  • hpy
┃◈├•  • syd
┃◈├•  • anger
┃◈├•  • shy
┃◈├•  • kiss
┃◈├•  • mon
┃◈├•  • cunfuzed
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '4': {
                title: "👑 *Owner Menu* 👑",
                content: `╭━━━〔 *Owner Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  ⚠️ *Restricted*
┃◈├•  • block @user
┃◈├•  • unblock @user
┃◈├•  • fullpp [img]
┃◈├•  • setpp [img]
┃◈├•  • restart
┃◈├•  • shutdown
┃◈├•  • updatecmd
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  ℹ️ *Info Tools*
┃◈├•  • gjid
┃◈├•  • jid @user
┃◈├•  • listcmd
┃◈├•  • allmenu
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '5': {
                title: "🤖 *AI Menu* 🤖",
                content: `╭━━━〔 *AI Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  💬 *Chat AI*
┃◈├•  • ai [query]
┃◈├•  • gpt3 [query]
┃◈├•  • gpt2 [query]
┃◈├•  • gptmini [query]
┃◈├•  • gpt [query]
┃◈├•  • meta [query]
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🖼️ *Image AI*
┃◈├•  • imagine [text]
┃◈├•  • imagine2 [text]
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🔍 *Specialized*
┃◈├•  • blackbox [query]
┃◈├•  • luma [query]
┃◈├•  • dj [query]
┃◈├•  • khan [query]
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '6': {
                title: "🎎 *Anime Menu* 🎎",
                content: `╭━━━〔 *Anime Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  🖼️ *Images*
┃◈├•  • fack
┃◈├•  • dog
┃◈├•  • awoo
┃◈├•  • garl
┃◈├•  • waifu
┃◈├•  • neko
┃◈├•  • megnumin
┃◈├•  • maid
┃◈├•  • loli
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🎭 *Characters*
┃◈├•  • animegirl
┃◈├•  • animegirl1-5
┃◈├•  • anime1-5
┃◈├•  • foxgirl
┃◈├•  • naruto
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '7': {
                title: "🔄 *Convert Menu* 🔄",
                content: `╭━━━〔 *Convert Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  🖼️ *Media*
┃◈├•  • sticker [img]
┃◈├•  • sticker2 [img]
┃◈├•  • emojimix 😎+😂
┃◈├•  • take [name,text]
┃◈├•  • tomp3 [video]
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  📝 *Text*
┃◈├•  • fancy [text]
┃◈├•  • tts [text]
┃◈├•  • trt [text]
┃◈├•  • base64 [text]
┃◈├•  • unbase64 [text]
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '8': {
                title: "📌 *Other Menu* 📌",
                content: `╭━━━〔 *Other Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  🕒 *Utilities*
┃◈├•  • timenow
┃◈├•  • date
┃◈├•  • count [num]
┃◈├•  • calculate [expr]
┃◈├•  • countx
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🎲 *Random*
┃◈├•  • flip
┃◈├•  • coinflip
┃◈├•  • rcolor
┃◈├•  • roll
┃◈├•  • fact
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🔍 *Search*
┃◈├•  • define [word]
┃◈├•  • news [query]
┃◈├•  • movie [name]
┃◈├•  • weather [loc]
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '9': {
                title: "💞 *Reactions Menu* 💞",
                content: `╭━━━〔 *Reactions Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  ❤️ *Affection*
┃◈├•  • cuddle @user
┃◈├•  • hug @user
┃◈├•  • kiss @user
┃◈├•  • lick @user
┃◈├•  • pat @user
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  😂 *Funny*
┃◈├•  • bully @user
┃◈├•  • bonk @user
┃◈├•  • yeet @user
┃◈├•  • slap @user
┃◈├•  • kill @user
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  😊 *Expressions*
┃◈├•  • blush @user
┃◈├•  • smile @user
┃◈├•  • happy @user
┃◈├•  • wink @user
┃◈├•  • poke @user
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            },
            '10': {
                title: "🏠 *Main Menu* 🏠",
                content: `╭━━━〔 *Main Menu* 〕━━━┈⊷
┃◈╭──────────────
┃◈├•  ℹ️ *Bot Info*
┃◈├•  • ping
┃◈├•  • live
┃◈├•  • alive
┃◈├•  • runtime
┃◈├•  • uptime
┃◈├•  • repo
┃◈├•  • owner
┃◈╰──────────────
┃◈╭──────────────
┃◈├•  🛠️ *Controls*
┃◈├•  • menu
┃◈├•  • menu2
┃◈├•  • restart
┃◈╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> ${config.DESCRIPTION}`,
                video: true
            }
        };

        // Message handler with improved error handling
        const handler = async (msgData) => {
            try {
                const receivedMsg = msgData.messages[0];
                if (!receivedMsg?.message || !receivedMsg.key?.remoteJid) return;

                const isReplyToMenu = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;
                
                if (isReplyToMenu) {
                    const receivedText = receivedMsg.message.conversation || 
                                      receivedMsg.message.extendedTextMessage?.text;
                    const senderID = receivedMsg.key.remoteJid;

                    if (menuData[receivedText]) {
                        const selectedMenu = menuData[receivedText];
                        
                        try {
                            if (selectedMenu.video) {
                                await conn.sendMessage(
                                    senderID,
                                    {
                                        video: { url: config.MENU_VIDEO_URL || 'https://files.catbox.moe/lnqhn4.mp4' },
                                        caption: selectedMenu.content,
                                        contextInfo: contextInfo
                                    },
                                    { quoted: receivedMsg }
                                );
                            } else {
                                await conn.sendMessage(
                                    senderID,
                                    { text: selectedMenu.content, contextInfo: contextInfo },
                                    { quoted: receivedMsg }
                                );
                            }

                            await conn.sendMessage(senderID, {
                                react: { text: '✅', key: receivedMsg.key }
                            });

                        } catch (e) {
                            console.log('Menu reply error:', e);
                            await conn.sendMessage(
                                senderID,
                                { text: selectedMenu.content, contextInfo: contextInfo },
                                { quoted: receivedMsg }
                            );
                        }

                    } else {
                        await conn.sendMessage(
                            senderID,
                            {
                                text: `❌ *Invalid Option!* ❌\n\nPlease reply with a number between 1-10 to select a menu.\n\n*Example:* Reply with "1" for Download Menu\n\n> ${config.DESCRIPTION}`,
                                contextInfo: contextInfo
                            },
                            { quoted: receivedMsg }
                        );
                    }
                }
            } catch (e) {
                console.log('Handler error:', e);
            }
        };

        // Add listener
        conn.ev.on("messages.upsert", handler);

        // Remove listener after 5 minutes
        setTimeout(() => {
            conn.ev.off("messages.upsert", handler);
        }, 300000);

    } catch (e) {
        console.error('Menu Error:', e);
        try {
            await conn.sendMessage(
                from,
                { text: `❌ Menu system is currently busy. Please try again later.\n\n> ${config.DESCRIPTION}` },
                { quoted: mek }
            );
        } catch (finalError) {
            console.log('Final error handling failed:', finalError);
        }
    }
});
