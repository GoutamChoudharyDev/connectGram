import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.utils.js";
import { sendResponse } from "../utils/response.utils.js";
import { env } from "../config/env.config.js";
import { userRepository } from "../repositories/user.repository.js";

// payload interface
interface JwtPayload {
    id: number;
}

// auth middleware 
export const isAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // get token from cookies
    const token = req.cookies?.accessToken;

    if (!token) {
        return sendResponse(
            res,
            401,
            false,
            "Unautherized access"
        )
    }

    // verify token
    const decoded = jwt.verify(token, env.ACCESS_SECRET_KEY) as JwtPayload;

    // find user
    const user = await userRepository.findOne({
        where: {
            id: decoded.id
        }
    })

    if (!user) {
        return sendResponse(
            res,
            404,
            false,
            "User not found"
        )
    }

    // store in req.user
    req.user = user;

    // call next 
    next();
})