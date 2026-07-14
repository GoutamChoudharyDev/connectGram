// env configuration
export const env = {
    PORT: Number(process.env.PORT),

    NODE_ENV: process.env.NODE_ENV as string,

    // database configuration
    DB_HOST: process.env.DB_HOST as string,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,

    // email configuration
    MAIL_HOST: process.env.MAIL_HOST as string,
    MAIL_PORT: Number(process.env.MAIL_PORT),
    MAIL_USER: process.env.MAIL_USER as string,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD as string,
}