import { Router } from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const router = Router();

router.use(arcjetProtection);

router.post("/signup", signup);
router.post("/login", login);

// secured routes
router.post("/logout", verifyJWT, logout);
router.put("/update-profile", verifyJWT, upload.single("profilePic"), updateProfile);

router.get("/check", verifyJWT, (req, res) => {
    res.status(200).json(req.user);
});

export default router;