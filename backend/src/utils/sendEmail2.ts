import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const emailHtml = (otp: string) => `
<div style="font-family: Arial, sans-serif; max-width: 420px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
  <h2 style="color: #333; text-align: center;">Recuperação de Senha</h2>

  <p style="font-size: 15px; color: #555;">
    Aqui está o seu código para redefinição de senha:
  </p>

  <div style="text-align: center; margin: 25px 0;">
    <div style="
      font-size: 34px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #2c3e50;
      background: #f7f7f7;
      padding: 15px 20px;
      border-radius: 8px;
      display: inline-block;
      border: 1px solid #ddd;
    ">
      ${otp}
    </div>
  </div>

  <p style="font-size: 14px; color: #777;">
    Este código expira em <strong>10 minutos</strong>.  
    Se você não solicitou, ignore este e-mail.
  </p>

  <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;">
  
  <p style="font-size: 12px; color: #aaa; text-align: center;">
    No Reply — Este e-mail foi gerado automaticamente.
  </p>
</div>
`;

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendOTPEmail(email: string, otp: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "noreplymmts@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    const info = await transporter.sendMail({
      from: "No Reply <noreplymmts@gmail.com>",
      to: email,
      subject: "Código de Recuperação de Senha",
      html: emailHtml(otp)
    });

    console.log("E-mail enviado:", info);
  } catch (err) {
    console.error("Erro ao enviar:", err);
  }
}
