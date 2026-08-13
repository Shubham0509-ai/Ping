import express from "express";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ path: "./.env" });

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => console.log("Server running on port: " + PORT));