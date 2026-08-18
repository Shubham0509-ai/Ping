import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

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

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(newUser._id)

    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(400, "Something went wrong while registering the user!")
    }

    const options = { // By default, the cookie is modifiable by the frontend
        httpOnly: true, // That's why we have to pass the fields httpOnly and secure as true with it so that it is read-only
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict" // CSRF attacks
    }

    try {
        const clientURL = process.env.CLIENT_URL; 
        await sendWelcomeEmail(createdUser.email, createdUser.fullName, clientURL);
    } catch (emailError) {
        // Optional: Log the error but don't crash signup if email failing shouldn't stop registration
        console.error("Signup succeeded but welcome email failed: ", emailError.message);
    }

    return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(201, createdUser, "User created successfully!")
    )

});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required!");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, "User does not exist!");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid user credentials!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, loggedInUser, "User logged in successfully!")
    )
});

export const logout = asyncHandler(async (req, res) => {
    // We have created auth middleware so that we can reuse that code again otherwise that code can be entirely written here
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully!")
    )
});