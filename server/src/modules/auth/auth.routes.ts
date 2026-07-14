import { Router } from "express";
import { registerUser, reSendOTP, verifyEmail } from "./auth.controller.js";

// router initialize
const authRouter = Router();

// auth api routes
authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/resend-otp", reSendOTP);

// export
export default authRouter;