import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";
import { conversationParticipantRepository, conversationRepository, messageRepository } from "../../repositories/chat.repository.js";
import { userRepository } from "../../repositories/user.repository.js";
import { In } from "typeorm";
import { getIo, getSocketId } from "../socket/socket.js";

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
    // get authenticated user
    const user = req.user;

    // get conversation id from params
    const conversationId = Number(req.params.conversationId);

    // validate conversation id
    if (Number.isNaN(conversationId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid conversation id"
        )
    }

    // check conversation exists
    const existingConversation = await conversationRepository.findOne({
        where: { id: conversationId },
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
    })

    if (!existingConversation) {
        return sendResponse(
            res,
            404,
            false,
            "Conversation not found"
        )
    }

    // check logged-in user is a participant of this conversation
    const isParticipant = existingConversation.participants.some(
        (participant) => participant.user.id === user.id
    )

    if (!isParticipant) {
        return sendResponse(
            res,
            403,
            false,
            "You are not autherized to access this conversation"
        )
    }

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Conversation fetched successfully",
        existingConversation
    )
})

// sendMessage controller
export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // get conversation id from params
    const conversationId = Number(req.params.conversationId);

    // validate conversation id
    if (Number.isNaN(conversationId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid conversation id"
        )
    }

    // get message content from req.body
    const { content } = req.body;

    // validate message content
    if (typeof content !== "string" || content.trim().length === 0) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid message"
        )
    }

    // check conversation exists
    const existingConversation = await conversationRepository.findOne({
        where: { id: conversationId },
        relations: {
            participants: {
                user: true,
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
    })

    // validate
    if (!existingConversation) {
        return sendResponse(
            res,
            404,
            false,
            "Conversation not found"
        )
    }

    // check authenticated user is a participant of this conversation
    const isParticipant = existingConversation.participants.some(
        (participant) => participant.user.id === user.id
    )

    if (!isParticipant) {
        return sendResponse(
            res,
            403,
            false,
            "You are not autherized to access this conversation"
        )
    }

    // create message
    const message = messageRepository.create({
        content: content.trim(),
        conversation: {
            id: conversationId
        },
        sender: {
            id: user.id
        }
    })

    // save message
    await messageRepository.save(message);

    // fetch saved message with sender details
    const savedMessage = await messageRepository.findOne({
        where: {
            id: message.id
        },
        relations: {
            sender: true
        },
        select: {
            id: true,
            content: true,
            isRead: true,
            createdAt: true,
            updatedAt: true,
            sender: {
                id: true,
                username: true,
                fullName: true,
                profilePicture: true
            }
        },
    });

    if (!savedMessage) {
        return sendResponse(
            res,
            500,
            false,
            "Failed to fetch saved message"
        );
    }

    existingConversation.updatedAt = new Date();
    await conversationRepository.save(existingConversation);

    // 1) find receiver
    const receiver = existingConversation.participants.find(
        (participant) => participant.user.id !== user.id
    )

    // 2) get receivers socket id
    const receiverSocketId = receiver ? getSocketId(receiver.user.id) : undefined;

    // get Socket.io instance
    const io = getIo();

    // 3) check whether receiver is online
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("new-message", savedMessage);
    }

    // return response
    return sendResponse(
        res,
        201,
        true,
        "Message sent successfully",
        savedMessage
    )
})

// getMessages controller
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // get conversation id from params
    const conversationId = Number(req.params.conversationId);

    // validate conversation id
    if (Number.isNaN(conversationId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid conversation id"
        )
    }

    // check conversation exists
    const existingConversation = await conversationRepository.findOne({
        where: {
            id: conversationId
        },
        relations: {
            participants: {
                user: true
            }
        }
    })

    if (!existingConversation) {
        return sendResponse(
            res,
            404,
            false,
            "Conversation not found"
        )
    }

    // check authenticated user is a participant of this conversation
    const isParticipant = existingConversation.participants.some(
        (participant) => participant.user.id === user.id
    )

    if (!isParticipant) {
        return sendResponse(
            res,
            403,
            false,
            "You are not autherized to access this conversation"
        )
    }

    // fetch messages
    const messages = await messageRepository.find({
        where: {
            conversation: {
                id: conversationId
            }
        },
        relations: {
            sender: true
        },
        select: {
            id: true,
            content: true,
            isRead: true,
            createdAt: true,
            updatedAt: true,
            sender: {
                id: true,
                username: true,
                fullName: true,
                profilePicture: true
            }
        },
        order: {
            createdAt: "ASC"
        }
    })

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Messages fetched successfully",
        messages
    )
})

// markMessageAsRead controller
export const markMessageAsRead = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // get message id from params
    const messageId = Number(req.params.messageId);

    // validate message id
    if (Number.isNaN(messageId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid message id"
        )
    }

    // find message
    // (load conversation, participants, sender)
    const message = await messageRepository.findOne({
        where: { id: messageId },
        relations: {
            sender: true,
            conversation: {
                participants: {
                    user: true
                }
            }
        }
    })

    // validate message exists
    if (!message) {
        return sendResponse(
            res,
            404,
            false,
            "Message not found"
        )
    }

    const isParticipant = message.conversation.participants.some(
        (participant) => participant.user.id === user.id
    );

    if (!isParticipant) {
        return sendResponse(
            res,
            403,
            false,
            "You are not authorized to access this message"
        );
    }

    // prevent sender from marking their own message as read
    if (message.sender.id === user.id) {
        return sendResponse(
            res,
            403,
            false,
            "You cannot mark your own message as read"
        );
    }

    // check if already read
    if (message.isRead) {
        return sendResponse(
            res,
            200,
            true,
            "Message is already marked as read"
        );
    }

    // mark message as read
    message.isRead = true;

    // save message
    await messageRepository.save(message);

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Message marked as read successfully"
    );
})

// // deleteMessageForMe controller
// export const deleteMessageForMe = asyncHandler(async (req: Request, res: Response) => {
//     // get authenticated user
//     const user = req.user;

//     // get message id from params
//     const messageId = Number(req.params.messageId);

//     // validate message id
//     if (Number.isNaN(messageId)) {
//         return sendResponse(
//             res,
//             400,
//             false,
//             "Invalid message id"
//         )
//     }

//     // find message
//     // (load conversation, participants, sender)
//     const message = await messageRepository.findOne({
//         where: { id: messageId },
//         relations: {
//             sender: true,
//         }
//     })

//     // validate message exists
//     if (!message) {
//         return sendResponse(
//             res,
//             404,
//             false,
//             "Message not found"
//         )
//     }

//     // check authenticated user belongs to conversation


//     // check if already hidden

//     // create hiddenMessage record

//     // save hiddenMessage

//     // return response
//     return sendResponse(
//         res,
//         200,
//         true,
//         "Message unsent successfully"
//     );
// })

// unsendMessage controller (delete from all)
export const unsendMessage = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // get message id from params
    const messageId = Number(req.params.messageId);

    // validate message id
    if (Number.isNaN(messageId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid message id"
        )
    }

    // find message
    // (load conversation, participants, sender)
    const message = await messageRepository.findOne({
        where: { id: messageId },
        relations: {
            sender: true,
        }
    })

    // validate message exists
    if (!message) {
        return sendResponse(
            res,
            404,
            false,
            "Message not found"
        )
    }

    // check sender owns this message
    if (message.sender.id !== user.id) {
        return sendResponse(
            res,
            403,
            false,
            "You are not authorized to unsend this message"
        );
    }

    // delete message
    await messageRepository.remove(message);

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Message unsent successfully"
    );
})