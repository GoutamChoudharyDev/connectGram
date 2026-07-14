import { Router } from "express";
import { registerUser } from "./auth.controller.js";

// router initialize
const authRouter = Router();

// auth api routes
authRouter.post("/register", registerUser);

// export
export default authRouter;