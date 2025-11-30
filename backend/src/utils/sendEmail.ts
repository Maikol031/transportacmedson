import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(email: string, otp: string) {
    
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev", // remetente padrão de teste
            to: "matheuschiefbr@gmail.com",
            subject: "Código de Recuperação de Senha",
            html: `
                <p>Seu código OTP:</p>
                <h2 style="font-size: 26px; letter-spacing: 6px;">${otp}</h2>
                <p>Válido por 10 minutos.</p>
            `,
        });
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        throw new Error("Falha ao enviar email.");
    }
}
