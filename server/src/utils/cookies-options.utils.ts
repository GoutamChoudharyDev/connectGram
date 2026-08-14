import { CookieOptions } from "express";
import { env } from "../config/env.config.js";

export const cookiesOptions: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict"
}