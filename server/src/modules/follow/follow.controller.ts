import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";
import { userRepository } from "../../repositories/user.repository.js";
import { followRepository } from "../../repositories/follow.repository.js";

// follow user controller
export const followUser = asyncHandler(async (req: Request, res: Response) => {
    // get logged in user
    const loggedInUser = req.user;

    // get targeted user id
    const userId = Number(req.params.userId);

    // validation
    if (Number.isNaN(userId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid user id"
        )
    }

    // find targeted user
    const targetUser = await userRepository.findOne({
        where: { id: userId }
    })

    if (!targetUser) {
        return sendResponse(
            res,
            404,
            false,
            "User not found"
        )
    }

    // validation to prevent self follow
    if (loggedInUser.id === targetUser.id) {
        return sendResponse(
            res,
            400,
            false,
            "You can't follow yourself"
        )
    }

    // check existing follow
    const existingFollow = await followRepository.findOne({
        where: {
            follower: { id: loggedInUser.id },
            following: { id: targetUser.id }
        }
    })

    if (existingFollow) {
        return sendResponse(
            res,
            400,
            false,
            "You already following this user"
        )
    }

    // create follow
    const follow = followRepository.create({
        follower: loggedInUser,
        following: targetUser
    })

    // save follow
    await followRepository.save(follow);

    return sendResponse(
        res,
        201,
        true,
        "User followed successfully",
        {
            followingId: targetUser.id
        }
    )
})

// unfollow user controller
export const unfollowUser = asyncHandler(async (req: Request, res: Response) => {
    // get loggedInUser
    const loggedInUser = req.user;

    // get targeted user
    const userId = Number(req.params.userId);

    // validation
    if (Number.isNaN(userId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid user id"
        )
    }

    // find user 
    const targetUser = await userRepository.findOne({
        where: { id: userId }
    })

    if (!targetUser) {
        return sendResponse(
            res,
            404,
            false,
            "User not found"
        )
    }

    // find follow relationship
    const existingFollow = await followRepository.findOne({
        where: {
            follower: { id: loggedInUser.id },
            following: { id: targetUser.id }
        }
    })

    if (!existingFollow) {
        return sendResponse(
            res,
            400,
            false,
            "You are not following this user"
        )
    }

    // remove follow record
    await followRepository.remove(existingFollow);

    return sendResponse(
        res,
        200,
        true,
        "User unfollowed successfully"
    )
})

// getFollowers controller
export const getFollowers = asyncHandler(async (req: Request, res: Response) => {
    // get username from params
    const username = req.params.username as string;

    // find user
    const user = await userRepository.findOne({
        where: { username }
    })

    if (!user) {
        return sendResponse(
            res,
            404,
            false,
            "User not found",
        )
    }

    // get followers
    const followers = await followRepository.find({
        where: {
            following: {
                id: user.id
            }
        },
        relations: {
            follower: true
        },
        select: {
            id: true,

            follower: {
                id: true,
                username: true,
                fullName: true,
                profilePicture: true,
                isVerified: true
            }
        },
        order: {
            createdAt: "DESC"
        },
    })

    return sendResponse(
        res,
        200,
        true,
        "Fetched all followers successfully",
        followers
    )
})

// getFollowers controller
export const getFollowing = asyncHandler(async (req: Request, res: Response) => {
    // get username from params
    const username = req.params.username as string;

    // find user
    const user = await userRepository.findOne({
        where: { username }
    })

    if (!user) {
        return sendResponse(
            res,
            404,
            false,
            "User not found",
        )
    }

    // get followers
    const followings = await followRepository.find({
        where: {
            follower: {
                id: user.id
            }
        },
        relations: {
            following: true
        },
        select: {
            id: true,

            following: {
                id: true,
                username: true,
                fullName: true,
                profilePicture: true,
                isVerified: true
            }
        },
        order: {
            createdAt: "DESC"
        }
    })

    return sendResponse(
        res,
        200,
        true,
        "Fetched all following users successfully",
        followings
    )
})

// getFollowStatus controller
export const getFollowStatus = asyncHandler(async (req: Request, res: Response) => {
    // get loggedInUser
    const loggedInUser = req.user;

    // get targeted user
    const userId = Number(req.params.userId);

    // validation
    if (Number.isNaN(userId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid user id"
        )
    }

    // find user 
    const targetUser = await userRepository.findOne({
        where: { id: userId }
    })

    if (!targetUser) {
        return sendResponse(
            res,
            404,
            false,
            "User not found"
        )
    }

    // find follow records
    const existingFollow = await followRepository.findOne({
        where: {
            follower: {
                id: loggedInUser.id
            },
            following: {
                id: targetUser.id
            }
        }
    })

    return sendResponse(
        res,
        200,
        true,
        "Follow status fetched successfully",
        {
            isFollowing: !!existingFollow
        }
    )
})