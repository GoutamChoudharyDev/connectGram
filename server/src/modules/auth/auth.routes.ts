import { Router } from "express";
import {
    refreshAccessToken,
    getMe,
    loginUser,
    logoutUser,
    registerUser,
    reSendOTP,
    verifyEmail
} from "./auth.controller.js";
import { isAuth } from "../../middleware/auth.middleware.js";

// router initialize
const authRouter = Router();

// auth api routes(public)
authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/resend-otp", reSendOTP);
authRouter.post("/login", loginUser);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.post("/logout", logoutUser);

// protected api
authRouter.get("/me", isAuth, getMe);

// export
export default authRouter;