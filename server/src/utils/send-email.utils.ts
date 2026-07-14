import { env } from "../config/env.config.js";
import { transporter } from "../config/mail.config.js";

// send email function
export const sendEmail = async (
    to: string,
    subject: string,
    html: string
): Promise<void> => {
    await transporter.sendMail({
        from: `"ConnectGram"<${env.MAIL_USER}>`,
        to,
        subject,
        html
    })
}