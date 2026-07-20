import { Router } from "express";

// import the all routes here
import authRouter from "../modules/auth/auth.routes.js";
import profileRouter from "../modules/profile/profile.routes.js";
import followRouter from "../modules/follow/follow.routes.js";
import postRouter from "../modules/post/post.routes.js";
import likeRouter from "../modules/like/like.routes.js";
import commentRouter from "../modules/comment/comment.routes.js";

// initialize router
const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/follow", followRouter);
router.use("/post", postRouter);

router.use("/likes", likeRouter);
router.use("/comments", commentRouter);

// export 
export default router;