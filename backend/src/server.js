import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/*path", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log("Server running on port: " + PORT);
    connectDB()
});