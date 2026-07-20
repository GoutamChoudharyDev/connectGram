import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.config.js";
import { User } from "../entities/user.entity.js";
import { EmailVerification } from "../entities/emailVerification.entity.js";
import { Follow } from "../entities/follow.entity.js";
import { Post } from "../entities/post.entity.js";
import { PostMedia } from "../entities/postMedia.entity.js";
import { Like } from "../entities/like.entity.js";
import { Comment } from "../entities/comment.entity.js";

// Configure TypeORM and connect to Postgres
const AppDataSource = new DataSource({
    // Database type
    type: "postgres",

    // DB connection
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,

    // TypeORM options
    synchronize: true, //automatically creates
    logging: true,

    // Register entities
    entities: [
        User,
        EmailVerification,
        Follow,
        Post,
        PostMedia,
        Like,
        Comment
    ],

    // Migrations
    migrations: [],

    // Subscribers
    subscribers: []
});

// export 
export { AppDataSource }