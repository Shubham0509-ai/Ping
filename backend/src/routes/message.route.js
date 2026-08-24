import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
import { getAllContacts, getChatPartners, getMessagesByUserId, sendMessage } from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// All are secured routes
// The middlewares execute in order - so requests get rate-limited first, then authenticated.
// This is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the auth middleware.
router.use(arcjetProtection, verifyJWT);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", upload.single("image"), sendMessage);

router.get("/send", (_, res) => {
    res.send("Send message endpoint");
})

export default router;