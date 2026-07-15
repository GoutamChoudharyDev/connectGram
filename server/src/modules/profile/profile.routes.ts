import { Router } from "express";
import { getUserProfile, updateUserProfile } from "./profile.controller.js";
import { isAuth } from "../../middleware/auth.middleware.js";

const profileRouter = Router();

// profile api's
profileRouter.get("/:username", getUserProfile);
profileRouter.patch("/", isAuth, updateUserProfile);

// export 
export default profileRouter;