import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";
import routes from "./routes/index.route.js";

// app initialize
const app = express();

// global middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// error middleware
app.use(errorMiddleware);

// default route
app.get("/", (_, res) => {
    res.send("Backend is running!")
})

// API Routes
app.use("/api", routes);

// export app
export default app;