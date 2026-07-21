import { Router } from "express";
import { isAuth } from "../../middleware/auth.middleware.js";
import { createConversation, getConversationById, getMessages, getMyConversations, markMessageAsRead, sendMessage, unsendMessage } from "./chat.controller.js";

const chatRouter = Router();

// Conversation api's
chatRouter.post("/conversations", isAuth, createConversation);
chatRouter.get("/conversations", isAuth, getMyConversations);
chatRouter.get("/conversations/:conversationId", isAuth, getConversationById);

// Messages api's
chatRouter.post("/conversations/:conversationId/messages", isAuth, sendMessage);
chatRouter.get("/conversations/:conversationId/messages", isAuth, getMessages);
chatRouter.patch("/messages/:messageId/read", isAuth, markMessageAsRead);
// chatRouter.delete("/messages/:messageId", isAuth, deleteMessageForMe);
chatRouter.patch("/messages/:messageId/unsend", isAuth, unsendMessage);//(delete from all)

export default chatRouter;