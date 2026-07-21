import { AppDataSource } from "../config/datasource.config.js";
import { Conversation } from "../entities/conversation.entity.js";
import { ConversationParticipant } from "../entities/conversationParticipants.entity.js";
import { Message } from "../entities/message.entity.js";

export const conversationRepository = AppDataSource.getRepository(Conversation);

export const conversationParticipantRepository = AppDataSource.getRepository(ConversationParticipant);

export const messageRepository = AppDataSource.getRepository(Message);