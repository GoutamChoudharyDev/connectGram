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
        order: {
            createdAt: "DESC"
        }
    })

    // format respone
    const followersList = followers.map((follow) => ({
        id: follow.follower.id,
        username: follow.follower.username,
        fullName: follow.follower.fullName,
        profilePicture: follow.follower.profilePicture,
        isVerified: follow.follower.isVerified
    }))

    return sendResponse(
        res,
        200,
        true,
        "Fetched all followers successfully",
        followersList
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
        order: {
            createdAt: "DESC"
        }
    })

    // format respone
    const followingList = followings.map((follow) => ({
        id: follow.following.id,
        username: follow.following.username,
        fullName: follow.following.fullName,
        profilePicture: follow.following.profilePicture,
        isVerified: follow.following.isVerified
    }))

    return sendResponse(
        res,
        200,
        true,
        "Fetched all following users successfully",
        followingList
    )
})

// getFollowStatus controller
export const getFollowStatus = asyncHandler(async (req: Request, res: Response) => {

})