import nodemailer from "nodemailer";
import { env } from "./env.config.js";

export const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    secure: false,
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP connection failed:", error);
    } else {
        console.log("SMTP server is ready:", success);
    }
});