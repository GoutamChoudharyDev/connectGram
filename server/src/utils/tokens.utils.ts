import jwt from "jsonwebtoken";
import { env } from "../config/env.config.js";

// generate access token function
export const generateAccessToken = (userId: number): string => {
    return jwt.sign(
        { id: userId },
        env.ACCESS_SECRET_KEY,
        { expiresIn: env.ACCESS_TOKEN_EXPIRY }
    )
}

// generate refresh token function
export const generateRefreshToken = (userId: number): string => {
    return jwt.sign(
        { id: userId },
        env.REFRESH_SECRET_KEY,
        { expiresIn: env.REFRESH_TOKEN_EXPIRY }
    )
}