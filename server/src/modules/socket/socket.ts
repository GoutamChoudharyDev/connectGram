import { Server } from "socket.io";
import { Server as HttpServer } from "http";

// Socket.IO instance (shared across the application)
let io: Server;

// Store online users (userId -> socketId)
const onlineUsers = new Map<number, string>();

// Initialize Socket.io
export const initializeSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            // origin: "http://localhost:5173"
        }
    })

    // Listen for new client connections
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Register authenticated user
        socket.on("register-user", (userId: number) => {
            // store userid and socketid
            onlineUsers.set(userId, socket.id)

            console.log(`User ${userId} registered`);
        });

        // Listen for client disconnection
        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }

            console.log(`User disconnected: ${socket.id}`);

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