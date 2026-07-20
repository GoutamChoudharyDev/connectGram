import { Router } from "express";
import { isAuth } from "../../middleware/auth.middleware.js";
import { addComment, deleteComment, getComments, getReplyComments, replyComment, updateComment } from "./comment.controller.js";

const commentRouter = Router();

// Public APIs
commentRouter.get("/posts/:postId", getComments);
commentRouter.get("/:commentId/replies", getReplyComments);

// Private APIs
commentRouter.post("/posts/:postId", isAuth, addComment);
commentRouter.patch("/:commentId", isAuth, updateComment);
commentRouter.delete("/:commentId", isAuth, deleteComment);
commentRouter.post("/:commentId/replies", isAuth, replyComment);

// Export
export default commentRouter;