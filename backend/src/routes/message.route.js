import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../lib/arcjet.js";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controllers/message.controller.js";

const router = Router();

// All are secured routes
router.use(arcjetProtection, verifyJWT);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

router.get("/send", (req, res) => {
    res.send("Send message endpoint");
})

export default router;