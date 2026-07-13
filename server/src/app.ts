import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// app initialize
const app = express();

// global middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// default route
app.get("/", (_, res) => {
    res.send("Backend is running!")
})

// route

// export app
export default app;