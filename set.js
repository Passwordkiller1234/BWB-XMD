
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU01CYjF3a1VmSDZHTmZ1c1J5ZkV5TU5xbHFCODZtUmhKSmYwM3FWdCtHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFM3OGdYL0FYSmdXMXlmM0p5NnV3eFpHWXBkelU2MThMS2NxZ1BrZ2F6VT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRkg2TUtnOFp3SU5QOUM1ck1YOTlZdEh3N21Zd280c1d1bkYvWmUxa0dNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRSXUrVExXRnJ1d2ZBQUV4OTZMWUdVNE1JY20rMC9JL1RiS1RGVTJjTDBJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllQaDJsWE9nM0E1VnZDNWtOUTVmQ2w0OEhsbkdsYUJVRHNJblJRV1VXRnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBWOG5MV0ZyNjJpSGtDcmtockNvdVQvdGFBSzVZd09ONEdoeFRuYTB3bGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0tjN1lRZjdsOVhZYldjSWF6R3Y2c0hkZnA4cnVLNDYzNnpPVUFqMDRFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSFpDS3ZmMURPZ3JScUxTZU5ETlJBZlhUR0tZODFoN1RLMTBHQStualpGVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlTclhDQVhoL2p1U2dacnk3RjJvd2h1blNrUW1pTG45amE0TXdYMmJMOTRNTjhjTUVOV3VRR2F2MWVzVmprRzAzQWg2OENKd2JVOWxVSjFVeWVoNGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDgsImFkdlNlY3JldEtleSI6IjFZNVdLMTB5Zk05STZVaWlzeFRhTkVrbjNxcnRjTUN6ckFVdXZPUm9lRlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTQwMTkwOTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAzNkU1QzY1NDU4MDMxMUNCMjY5M0I0MjQ5M0NFQzhGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA1MzkyMTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU0MDE5MDk2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNzAyOEJGQTVGQTBCMUZBMDc1OTk2NjAzNzU0OUY2NyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNTM5MjE2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJMSjlSU1dISCIsIm1lIjp7ImlkIjoiMjMzNTQwMTkwOTYzOjczQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ikl0J3MgUGxlbnR5IiwibGlkIjoiMzMwODYzNTA5NzQ5OjczQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzNNeXZjQkVKKzMzTUlHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTWNTZy9PcTJOejlnQjhqYWdJeWZlZlU5WHBIV3kyZitreEQ2bWdWSGlXTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNE5BVDNMY2JkdWNDZ3p2RUh0UHM5aEQxNVVEeGc0TnhNbm1Va0huRElpYlB5dEtiYWlCVVJiY05hZTlIWnZEbHN3REQ0MmVWS0thMFZWT3ljVjA4Q3c9PSIsImRldmljZVNpZ25hdHVyZSI6InhQUnRyMFNWWlk4K2ErRjh6MkdEZXBucCtsQnVqNlZDV3ZnSFJKVXpvYVVWU3l1UG9maFVIeHBZSTNWRVlIdjg2dlhYMkUxV2JRTTFDbjZBTW1iWGdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMzNTQwMTkwOTYzOjczQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRIRW9QenF0amMvWUFmSTJvQ01uM24xUFY2UjFzdG4vcE1RK3BvRlI0bGoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDUzOTE3OSwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURKNiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "princetech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233540190963",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
