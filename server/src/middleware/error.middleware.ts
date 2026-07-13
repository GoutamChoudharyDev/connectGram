import { ErrorRequestHandler } from "express";

// error middleware
export const errorMiddleware: ErrorRequestHandler = (
    error,
    req,
    res,
    next
) => {
    return res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
    })
}