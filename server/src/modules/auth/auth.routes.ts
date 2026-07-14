import { Router } from "express";
import { loginUser, registerUser, reSendOTP, verifyEmail } from "./auth.controller.js";

// router initialize
const authRouter = Router();

// auth api routes
authRouter.post("/register", registerUser);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/resend-otp", reSendOTP);
authRouter.post("/login", loginUser);

// export
export default authRouter;