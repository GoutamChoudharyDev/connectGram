import { userRepository } from "../../repositories/user.repository.js";
import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";
import cloudinary from "../../config/cloudinary.config.js";
import { env } from "../../config/env.config.js";

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

    if (!username.trim()) {
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

// update user profile controller
export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    // get fullName, bio, website from req.body
    const { fullName, bio, website } = req.body;

    // get logged user
    const user = req.user;

    // validation
    if (
        fullName === undefined &&
        bio === undefined &&
        website === undefined
    ) {
        return sendResponse(
            res,
            400,
            false,
            "Provide atleast one field to update"
        )
    }

    // full name validation 
    if (fullName && fullName.length > 100) {
        return sendResponse(
            res,
            400,
            false,
            "Full name can't exceed 100 character"
        )
    }

    // bio validation
    if (bio && bio.length > 150) {
        return sendResponse(
            res,
            400,
            false,
            "Bio can't exced 150 characters"
        )
    }

    // update fileds 
    if (fullName !== undefined) {
        user.fullName = fullName.trim();
    }

    if (bio !== undefined) {
        user.bio = bio;
    }

    if (website !== undefined) {
        user.website = website;
    }

    // save updated user
    const updatedUser = await userRepository.save(user);

    // public response
    const profile = {
        id: updatedUser.id,
        username: updatedUser.username,
        fullName: updatedUser.fullName,
        profilePicture: updatedUser.profilePicture,
        bio: updatedUser.bio,
        website: updatedUser.website,
        isVerified: updatedUser.isVerified,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
    };

    return sendResponse(
        res,
        200,
        true,
        "Profile Updated successfully",
        profile
    )
})

// update profile picture
export const updateProfilePicture = asyncHandler(async (req: Request, res: Response) => {
    // get logged in user
    const user = req.user;

    // get uploaded file
    const file = req.file;
    console.log("file: ", file); // comming

    // validation
    if (!file) {
        return sendResponse(
            res,
            400,
            false,
            "Profile picture is required"
        )
    }
    
    // upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        {
            folder: "connectGram/profile-pictures"
        }
    )

    // update profile picture
    user.profilePicture = uploadedImage.secure_url;
    user.profilePicturePublicId = uploadedImage.public_id;

    // save user
    await userRepository.save(user);

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Profile picture updated successfully",
        {
            profilePicture: user.profilePicture
        }
    )
})

export const deleteProfilePicture = asyncHandler(async (req: Request, res: Response) => {
    // get logged in user
    const user = req.user;
    console.log("user", user);

    // check profile picture exists
    if (!user.profilePicture || !user.profilePicturePublicId) {
        return sendResponse(
            res,
            404,
            false,
            "Profile picture not found"
        )
    }

    // delete profile pic from cloudinary
    await cloudinary.uploader.destroy(user.profilePicturePublicId);

    // remove profile pic from DB
    user.profilePicture = null;
    user.profilePicturePublicId = null;

    // save user
    await userRepository.save(user);

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Profile picture deleted successfully"
    )
})