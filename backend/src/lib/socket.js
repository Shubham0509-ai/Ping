import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true
    },
});

// Apply authentication middleware to all socket connetions
io.use(socketAuthMiddleware);

// We will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
};

// This is for storing online users
const userSocketMap = {}; // { userId: socketId }

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.user.fullName);

    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // With socket.on, we listen for events
    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };