import { Router } from "express";
import { isAuth } from "../../middleware/auth.middleware.js";
import { createPost, deletePost, getAllPosts, getPost, updatePost } from "./post.controller.js";
import { upload } from "../../middleware/multer.middleware.js";

const postRouter = Router();

// public
postRouter.get("/posts", getAllPosts); // all post
postRouter.get("/:postId", getPost); // single post(by id)

// private
postRouter.post("/", isAuth, upload.array("media", 5), createPost);
postRouter.patch("/:postId", isAuth, updatePost); // only caption or location
postRouter.delete("/:postId", isAuth, deletePost);

// export
export default postRouter;