import { Router } from "express";
import { isAuth } from "../../middleware/auth.middleware.js";
import {
    followUser,
    getFollowers,
    getFollowing,
    getFollowStatus,
    unfollowUser
} from "./follow.controller.js";

const followRouter = Router();

// Protected follow api's
followRouter.post("/:userId", isAuth, followUser);
followRouter.delete("/:userId", isAuth, unfollowUser);

// public follow api's
followRouter.get("/followers/:username", getFollowers);
followRouter.get("/following/:username", getFollowing);

// private follow api
followRouter.get("/status/:userId", isAuth, getFollowStatus);

// export
export default followRouter;