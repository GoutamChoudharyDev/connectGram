import "dotenv/config";
import "reflect-metadata";

import app from "./app.js";
import { env } from "./config/env.config.js";
import { AppDataSource } from "./config/datasource.config.js";

// StartServer function
const startServer = async () => {
    try {
        // connect DB
        await AppDataSource.initialize();

        console.log("Database connected successfully");

        app.listen(env.PORT, () => {
            console.log(`Server is running on port : ${env.PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect database", error);
        process.exit(1);
    }
}

// Call the function
startServer();