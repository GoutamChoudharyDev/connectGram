import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";
import { conversationParticipantRepository, conversationRepository } from "../../repositories/chat.repository.js";
import { userRepository } from "../../repositories/user.repository.js";
import { In } from "typeorm";

// createConversation controller
export const createConversation = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // get receiver user id from req.body
    const { receiverId } = req.body;

    // validate receiver user id
    if (typeof receiverId !== "number" || Number.isNaN(receiverId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid receiver id"
        );
    }

    // prevent creating conversation with yourself
    if (user.id === receiverId) {
        return sendResponse(
            res,
            400,
            false,
            "You can't create conversation with yourself"
        )
    }

    // check receiver user exists
    const receiver = await userRepository.findOne({
        where: { id: receiverId }
    })

    if (!receiver) {
        return sendResponse(
            res,
            404,
            false,
            "Receiver not found"
        );
    }

    // check if conversation already exists between both users
    const existingConversation = await conversationRepository
        .createQueryBuilder("conversation") // it tells i'm goint to build a custom sql query
        .innerJoin(
            "conversation.participants",
            "senderParticipant"
        )
        .innerJoin(
            "conversation.participants",
            "receiverParticipant"
        )
        .where(
            "senderParticipant.userId = :senderId",
            { senderId: user.id }
        )
        .andWhere(
            "receiverParticipant.userId = :receiverId",
            { receiverId }
        )
        .getOne();

    // if exists, return existing conversation
    if (existingConversation) {
        return sendResponse(
            res,
            200,
            true,
            "Conversation already exists",
            existingConversation
        )
    }

    // create new conversation
    const conversation = conversationRepository.create();

    // save conversation
    await conversationRepository.save(conversation);

    // create participant entry for authenticated user
    const senderParticipant = conversationParticipantRepository.create({
        conversation: {
            id: conversation.id
        },
        user: {
            id: user.id
        }
    })

    // create participant entry for receiver user
    const receiverParticipant = conversationParticipantRepository.create({
        conversation: {
            id: conversation.id
        },
        user: {
            id: receiverId
        }
    })

    // save both participants
    await conversationParticipantRepository.save([
        senderParticipant,
        receiverParticipant
    ])

    // fetch conversation with participants
    const createdConversation = await conversationRepository.findOne({
        where: {
            id: conversation.id
        },
        relations: {
            participants: {
                user: true
            }
        },
        select: {
            id: true,
            createdAt: true,
            participants: {
                id: true,
                joinedAt: true,
                user: {
                    id: true,
                    username: true,
                    fullName: true,
                    profilePicture: true
                }
            }
        }
    })

    // return response
    return sendResponse(
        res,
        201,
        true,
        "Conversation created successfully",
        createdConversation
    )
})

//getMyConversations controller
export const getMyConversations = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // find all conversation ids where the user is a participant
    const conversationParticipants = await conversationParticipantRepository.find({
        where: {
            user: {
                id: user.id
            },
        },
        relations: {
            conversation: true
        }
    })

    // extract conversation ids
    const conversationIds = conversationParticipants.map((participant) => (
        participant.conversation.id
    ))

    // if user has no conversation
    if (conversationIds.length === 0) {
        return sendResponse(
            res,
            404,
            false,
            "Conversation not found",
            []
        )
    }

    // fetch conversations with participants
    const conversations = await conversationRepository.find({
        where: {
            id: In(conversationIds)
        },
        relations: {
            participants: {
                user: true
            }
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            participants: {
                id: true,
                joinedAt: true,
                user: {
                    id: true,
                    username: true,
                    fullName: true,
                    profilePicture: true,
                }
            }
        },
        order: {
            updatedAt: "DESC"
        }
    })

    // return response
    return sendResponse(
        res,
        200,
        true,
        "My conversation fetched successfully",
        conversations
    )
})

// getConversationById controller
export const getConversationById = asyncHandler(async (req: Request, res: Response) => {

})

// sendMessage controller
export const sendMessage = asyncHandler(async (req: Request, res: Response) => {

})

// getMessages controller
export const getMessages = asyncHandler(async (req: Request, res: Response) => {

})

// markMessageAsRead controller
export const markMessageAsRead = asyncHandler(async (req: Request, res: Response) => {

})

// deleteMessageForMe controller
export const deleteMessageForMe = asyncHandler(async (req: Request, res: Response) => {

})

// unsendMessage controller
export const unsendMessage = asyncHandler(async (req: Request, res: Response) => {

})