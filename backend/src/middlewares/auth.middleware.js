import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/*
Cross-Platform Support (Mobile vs. Web):
1. Web Browsers: Usually store tokens in secure HttpOnly cookies (req.cookies).
Cookies are automatically sent by the browser with every request.
2. Mobile Apps (iOS/Android) & Desktop Apps: Do not have a built-in "cookie browser engine" that handles cookies automatically.
Instead, they store tokens in secure local storage and must manually send them inside the Authorization HTTP header as a Bearer token (Authorization: Bearer <token>).
*/

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) // Always put it inside a try-catch block because if the verification fails then the method will instantly throw a runtime error
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
});