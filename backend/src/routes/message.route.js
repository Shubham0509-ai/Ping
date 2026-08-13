import { Router } from "express";

const router = Router();

router.get("/send", (req, res) => {
    res.send("Send message endpoint");
})

export default router;