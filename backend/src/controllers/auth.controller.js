import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

export const signup = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            throw new ApiError(400, "All fields are required!");
        }

        if (password.length < 6) {
            throw new ApiError(400, "Password must be atleast 6 characters!");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }

        const user = await User.findOne({ email });

        if (user) {
            throw new ApiError(400, "Email already exists!")
        }

        const newUser = await User.create({
            fullName,
            email,
            password
        })

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(400, "Something went wrong while registering the user!")
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User created successfully!")
        )

    } catch (error) {
        
    }
})