import mongoose from "mongoose";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllContacts = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
        throw new ApiError(401, "Authentication required!");
    }

    const filteredUsers = await User.find({
        _id : {
            $ne: loggedInUserId
        }
    }).select("-password -refreshToken");

    return res
    .status(200)
    .json(
        new ApiResponse(200, filteredUsers, "Contacts fetched successfully!")
    )
});

export const getMessagesByUserId = asyncHandler(async (req, res) => {
    const myId = req.user?._id;

    if (!myId) {
        throw new ApiError(401, "Authentication failed!");
    }

    const { id: userToChatId } = req.params;

    if (!userToChatId) {
        throw new ApiError(400, "Receiver user ID is required!");
    }

    // Added chronological sorting
    const messages = await Message.find({
        $or: [
            {senderId: myId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: myId}
        ]
    }).sort({ createdAt: 1 }); // Ensures chat reads from top to bottom

    return res
    .status(200)
    .json(
        new ApiResponse(200, messages, "Messages fetched successfully!")
    )
});

export const sendMessage = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const imageLocalPath  = req.file?.path;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!receiverId) {
        throw new ApiError(400, "Receiver user ID is required!");
    }

    if (!text && !imageLocalPath) {
        throw new ApiError(400, "Message text or image is required!");
    }

    if (!senderId) {
        throw new ApiError(401, "Authentication failed!");
    }

    let image;
    if (imageLocalPath) {
        image = await uploadOnCloudinary(imageLocalPath);

        if (!image.url) {
            throw new ApiError(500, "Error while uploading image to cloudinary");
        }
    }

    const message = await Message.create({
        senderId,
        receiverId,
        text: text || "",
        image: image?.url || "",
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
        io.to(receiverSocketId).emit("message", message);
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, message, "Message sent successfully!")
    );
});

export const getChatPartners = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      throw new ApiError(400, "Authentication failed!");
    }

    const loggedInUserObjectId = new mongoose.Types.ObjectId(loggedInUserId);

    // Find unique partner IDs directly in the database
    const aggregateResult = await Message.aggregate([
    {
        $match: {
            $or: [
                { senderId: loggedInUserObjectId },
                { receiverId: loggedInUserObjectId }
            ]
        }
    },
    {
        $project: {
            partnerId: {
                $cond: {
                    if: { 
                        $eq: ["$senderId", loggedInUserObjectId] 
                    },
                    then: "$receiverId",
                    else: "$senderId"
                }
            }
        }
    },
    {
        $group: {
            _id: null,
            uniquePartners: { $addToSet: "$partnerId" }
        }
    }
    ]);

    const chatPartnersIds = aggregateResult.length > 0 ? aggregateResult[0].uniquePartners : [];

    // Fetch partner user details
    const chatPartners = await User.find({ 
        _id: { $in: chatPartnersIds } 
    }).select("-password -refreshToken");

    return res
    .status(200)
    .json(
        new ApiResponse(200, chatPartners, "Chat partners fetched successfully!")
    );
});
