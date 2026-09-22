import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

const PORT = process.env.PORT || 3000;

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(frontendDist));

    app.get("/{*path}", (req, res) => {
        res.sendFile(path.join(frontendDist, "index.html"));
    });
}

server.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    connectDB();
});