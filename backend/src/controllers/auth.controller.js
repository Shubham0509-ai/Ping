import { asyncHandler } from "../utils/asyncHandler.js";

export const signup = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
})