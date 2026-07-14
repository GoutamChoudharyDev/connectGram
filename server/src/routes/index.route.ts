import { Router } from "express";

// import the all routes here
import authRouter from "../modules/auth/auth.routes.js";

// initialize router
const router = Router();

router.use("/auth", authRouter);

// export 
export default router;