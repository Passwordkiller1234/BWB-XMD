
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUFxSmQzUnFQM29nYXRiUzltVTRQeEZNMkR6Uk5DWmlPeWt0ZlJpUmxVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZTRtY0h4OUxBekcyUHhWa01hYVM4TXRjN3luYmloYTYwS0p6U3Z3d2JCWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5TzAxN1RNR2FQY0FGdXU0S05GUUFrMTN4K0xvZjh4SnNTRysyMlVtWlhRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyQ2VhTlFvR1RJRCtSY213SVcxWlkvdnBLenFEWFVkY3ZBbm5nVW5MQkRNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdFUkVKTTZNWDlNN25SVE81dWpnYzk1dmRISnFnMCtxYVYwZGg4VjYvWE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlRcUxiSTFVVWYwVXRqc1dnWGZHbFhQd2RwVDlkS3BXemdwQnBlQVNjQ0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BzWkV5M2tLdVF1WmpzajlZeXgvSXZVWTBoSm04c0JlUS9teEtFRTBYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU1CZUFjRDZYcnlHNzgxMm1YL3M2KzJ6VC9sZi80bjVJZkNsaUlMbGQyWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVzU3BFUys1QmtEUnIzdENmZmNQOXhiTDdndkJCRURwdXdLZ1JtS1BXalhuR1hvaE1xUXE5UGRac0dDbEZQK1AzTDZYN1Nzd0pjRElmUk9IOFBKK2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIyLCJhZHZTZWNyZXRLZXkiOiI2ZWdFTzhjazdobjRPSTFDL3prRGxJZFUyY0ZhUStmWVlGczNadlhQNXlvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU0MDE5MDk2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwOTZERjQ0ODA3Njk1MDJBOEJEMTQ2MUY2NEU5RjJCQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUwNzYyNTU4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzM1NDAxOTA5NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTVFRUE5QTI2RDY5MUVFNzNCQzdCQTg0MjExQTdCNUEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDc2MjU1OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjMzNTQwMTkwOTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjgwMUIxRUE3OUQ3QjEwMkJBNzk2QUQ3Nzg1OTQ1Q0JBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTA3NjI1ODh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlNRVDk5UTlEIiwibWUiOnsiaWQiOiIyMzM1NDAxOTA5NjM6NzVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSXQncyBQbGVudHkiLCJsaWQiOiIzMzA4NjM1MDk3NDk6NzVAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLL015dmNCRUtTSTZzSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNY1NnL09xMk56OWdCOGphZ0l5ZmVmVTlYcEhXeTJmK2t4RDZtZ1ZIaVdNPSIsImFjY291bnRTaWduYXR1cmUiOiJ5c0p6cWptZzFnc1BPYXJzbE1IaVA5aU5vNXd4RWZ1Vmt6KytxazEyNTBKemY2N2lmSHVKNmxYM0VLOVNONzlsY3FPMk5pbEJmYkJCcmJlUHRRc0hEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidDZ4cUQ2K2V0Ly9IK2EzSk9mZ3BaTjJuTmUwU2JmMVBDTDVxd3ZuenVGUGZqOVlCdWl6bjF2RlFkKys2dGRoZEp3ejJWSGxROGRUOXpKM1h5V0U3alE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NDAxOTA5NjM6NzVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVEhFb1B6cXRqYy9ZQWZJMm9DTW4zbjFQVjZSMXN0bi9wTVErcG9GUjRsaiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUwNzYyNTQ1LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBREtDIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "princetech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "233540190963",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
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
