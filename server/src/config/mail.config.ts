// import nodemailer from "nodemailer";
// import { env } from "./env.config.js";

// // mail configuration
// export const transporter = nodemailer.createTransport({
//     host: env.MAIL_HOST,
//     port: env.MAIL_PORT,
//     secure: false,

//     // Force IPv4
//     family: 4,

//     auth: {
//         user: env.MAIL_USER,
//         pass: env.MAIL_PASSWORD
//     }
// });


import nodemailer from "nodemailer";
import { env } from "./env.config.js";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
    },
});