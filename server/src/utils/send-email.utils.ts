import { env } from "../config/env.config.js";
import { transporter } from "../config/mail.config.js";

// send email function
export const sendEmail = async (
    to: string,
    subject: string,
    html: string
): Promise<void> => {
    try {
        const info = await transporter.sendMail({
            from: `"ConnectGram"<${env.MAIL_USER}>`,
            to,
            subject,
            html
        })

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
}