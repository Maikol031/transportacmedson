import { google } from "googleapis";
import readline from "readline";

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob";

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const SCOPES = ["https://mail.google.com/"];

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
});

console.log("Abra esta URL no navegador:\n", authUrl);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Cole aqui o código fornecido pelo Google: ", async (code) => {
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        console.log("\n--- TOKEN GERADOS ---");
        console.log("Refresh Token:", tokens.refresh_token);
        console.log("---------------------");
        rl.close();
    } catch (err) {
        console.error("Erro ao gerar token:", err);
        rl.close();
    }
});
