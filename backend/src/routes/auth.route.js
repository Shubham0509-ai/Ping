import { Router } from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// secured routes
router.post("/logout", verifyJWT, logout);
router.put("/update-profile", verifyJWT, upload.single("profilePic"), updateProfile);

export default router;