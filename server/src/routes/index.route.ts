import { Router } from "express";

// import the all routes here
import authRouter from "../modules/auth/auth.routes.js";
import profileRouter from "../modules/profile/profile.routes.js";
import followRouter from "../modules/follow/follow.routes.js";

// initialize router
const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/follow", followRouter);

// export 
export default router;