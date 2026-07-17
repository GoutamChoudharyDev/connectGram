import { Router } from "express";
import { isAuth } from "../../middleware/auth.middleware.js";
import { getLikeStatus, getPostLikes, likePost, unlikePost } from "./like.controller.js";

const likeRouter = Router();

// private api's
likeRouter.post("/:postId", isAuth, likePost);
likeRouter.delete("/:postId", isAuth, unlikePost);
likeRouter.get("/:postId", isAuth, getPostLikes);
likeRouter.get("/status/:postId", isAuth, getLikeStatus);

export default likeRouter;