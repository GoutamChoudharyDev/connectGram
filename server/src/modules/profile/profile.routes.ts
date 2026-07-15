import { Router } from "express";
import {
    deleteProfilePicture,
    getUserProfile,
    updateProfilePicture,
    updateUserProfile
} from "./profile.controller.js";
import { isAuth } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/multer.middleware.js";

const profileRouter = Router();

// profile api's
profileRouter.get("/:username", getUserProfile);
profileRouter.patch("/", isAuth, updateUserProfile);
profileRouter.patch(
    "/profile-picture",
    isAuth,
    upload.single("profilePicture"),
    updateProfilePicture
);
profileRouter.delete("/profile-picture", isAuth ,deleteProfilePicture);

// export 
export default profileRouter;