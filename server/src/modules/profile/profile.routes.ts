import { Router } from "express";
import { getUserProfile } from "./profile.controller.js";

const profileRouter = Router();

// profile api's
profileRouter.get("/:username", getUserProfile);

// export 
export default profileRouter;