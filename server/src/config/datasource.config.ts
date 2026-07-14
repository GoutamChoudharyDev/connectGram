import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.config.js";
import { User } from "../entities/user.entity.js";

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
    entities: [User],

    // Migrations
    migrations: [],

    // Subscribers
    subscribers: []
});

// export 
export { AppDataSource }