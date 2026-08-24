import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        // Extract token from http-only cookies
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            return next(new ApiError(401, "Unauthorized - No Token Provided!"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return next(new ApiError(401, "Invalid Access Token"));
        }

        // Attach user info to socket
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);

        next();
    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        return next(new ApiError(401, error?.message || "Unauthorized - Authentication failed"));
    }
};
