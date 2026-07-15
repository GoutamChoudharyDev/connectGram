import { userRepository } from "../../repositories/user.repository.js";
import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";

// get user profile controller
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    // get user name from params
    const username = req.params.username as string;

    if (!username) {
        return sendResponse(
            res,
            400,
            false,
            "Username is required"
        )
    }

    // get user from database
    const user = await userRepository.findOne({
        where: { username }
    })

    if (!user) {
        return sendResponse(
            res,
            404,
            false,
            "user not found"
        )
    }

    // profile response
    const profile = {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
        bio: user.bio,
        website: user.website,
        isVerified: user.isVerified,
        createdAt: user.createdAt
    }

    return sendResponse(
        res,
        200,
        true,
        "User profile fetched successfully",
        profile
    )
})