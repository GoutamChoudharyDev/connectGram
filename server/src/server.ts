import "reflect-metadata";
import "dotenv/config";

import { createServer } from "http";

import app from "./app.js";
import { env } from "./config/env.config.js";
import { AppDataSource } from "./config/datasource.config.js";
import { initializeSocket } from "./modules/socket/socket.js";

// 1) Create HTTP Server
const server = createServer(app);

// StartServer function
const startServer = async () => {
    try {
        // connect DB
        await AppDataSource.initialize();

        console.log("Database connected successfully");

        // 3) initialize Socket io server
        initializeSocket(server);

        // 2) instead of app.listen(), we use server.listen()
        server.listen(env.PORT, () => {
            console.log(`Server is running on port : ${env.PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect database", error);
        process.exit(1);
    }
}

// Call the function
startServer();