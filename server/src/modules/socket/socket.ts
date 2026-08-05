import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { conversationRepository, messageRepository } from "../../repositories/chat.repository.js";

// Socket.IO instance (shared across the application)
let io: Server;

// Store online users (userId -> socketId)
const onlineUsers = new Map<number, string>();

// Store users (socketId -> userId)
const socketUsers = new Map<string, number>();

// 3) Initialize Socket.io
export const initializeSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    })

    // Listen for new client connections
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Register authenticated user
        socket.on("register-user", (userId: number) => {
            // store userid and socketid
            onlineUsers.set(userId, socket.id);
            socketUsers.set(socket.id, userId);

            io.emit("user-online", userId);
        });

        // Listen for send-message
        socket.on(
            "send-message",
            async (data: { conversationId: number; content: string }) => {
                try {
                    // get convesationId and content from data
                    const { conversationId, content } = data;

                    // get sender form socket
                    const senderId = socketUsers.get(socket.id);

                    if (!senderId) {
                        socket.emit("message-error", "Unautherized");
                        return;
                    }

                    // validate conversation id
                    if (Number.isNaN(conversationId)) {
                        socket.emit("message-error", "Invalid conversation id");
                        return;
                    }

                    // validate message
                    if (typeof content !== "string" || content.trim().length === 0) {
                        socket.emit("message-error", "Invalid message");
                    }

                    // Check conversation exists
                    const existingConversation = await conversationRepository.findOne({
                        where: { id: conversationId },
                        relations: {
                            participants: {
                                user: true,
                            },
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
                                },
                            },
                        },
                    });

                    if (!existingConversation) {
                        socket.emit("message-error", "Conversation not found")
                    }

                    // check sender is a participant
                    const isParticipant = existingConversation?.participants.some(
                        (participant) => participant.user.id === senderId
                    );

                    if (!isParticipant) {
                        socket.emit(
                            "message-error",
                            "You are not autherized to access this conversation"
                        );

                        return;
                    }

                    // create message
                    const message = messageRepository.create({
                        content: content.trim(),
                        conversation: {
                            id: conversationId,
                        },
                        sender: {
                            id: senderId,
                        },
                    });

                    // save message in DB
                    await messageRepository.save(message);

                    // Fetch saved message
                    const savedMessage = await messageRepository.findOne({
                        where: {
                            id: message.id,
                        },
                        relations: {
                            sender: true,
                            conversation: true
                        },
                        select: {
                            id: true,
                            content: true,
                            isRead: true,
                            createdAt: true,
                            updatedAt: true,
                            conversation: {
                                id: true
                            },
                            sender: {
                                id: true,
                                username: true,
                                fullName: true,
                                profilePicture: true,
                            },
                        },
                    });

                    if (!savedMessage) {
                        socket.emit("message-error", "Failed to fetch saved message");
                        return;
                    }

                    // find receiver
                    const receiver = existingConversation?.participants.find(
                        (participant) => participant.user.id !== senderId
                    );

                    // send to receiver if online
                    if (receiver) {
                        const receiverSocketId = getSocketId(receiver.user.id);

                        if (receiverSocketId) {
                            io.to(receiverSocketId).emit("new-message", savedMessage);
                        }
                    }

                    // send back to sender
                    socket.emit("new-message", savedMessage);

                } catch (error) {
                    console.error(error);
                }
            }
        )

        // Listen for unsend-message
        socket.on("unsend-message", async ({ messageId }) => {
            if (!messageId) return;

            // get sender form socket
            const senderId = socketUsers.get(socket.id);

            if (!senderId) {
                socket.emit("error-message", "Unautherized");
                return;
            }

            // Validate messageId
            if (Number.isNaN(messageId)) {
                socket.emit("error-message", "Invalid message id");
                return;
            }

            // Find message
            const message = await messageRepository.findOne({
                where: {
                    id: messageId
                },
                relations: {
                    sender: true,
                    conversation: {
                        participants: {
                            user: true
                        }
                    }
                }
            })

            // Check message exists
            if (!message) {
                socket.emit("error-message", "Message not found");
                return;
            }

            // Verify the sender owns the message
            if (message.sender.id !== senderId) {
                socket.emit("error-message", "You doesn't have access to delete this message");
                return;
            }

            // Delete message from database
            await messageRepository.remove(message);

            const receiver = message.conversation.participants.find(
                (participant) => participant.user.id !== senderId
            );

            const receiverSocketId = receiver
                ? onlineUsers.get(receiver.user.id)
                : undefined;

            // 6. Notify both clients
            socket.emit("message-unsent", {
                messageId,
            });

            if (receiverSocketId) {
                io.to(receiverSocketId).emit("message-unsent", {
                    messageId,
                });
            }

        })

        // Listen for client disconnection
        socket.on("disconnect", () => {
            const userId = socketUsers.get(socket.id);

            if (userId) {
                onlineUsers.delete(userId);
                socketUsers.delete(socket.id);
            }

            io.emit("user-offline", userId);
        })
    })

    return io;
}

// Get the initialized Socket.io instance(use socket.io)
export const getIo = () => {
    // Prevent access before initialization
    if (!io) {
        throw new Error("Socket.io has not been initialized");
    }

    return io;
}

// Get socket id of an online user
export const getSocketId = (userId: number) => {
    return onlineUsers.get(userId)
}