import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";
import { postRepository } from "../../repositories/post.repository.js";
import { likeRepository } from "../../repositories/like.repository.js";

// likePost controller
export const likePost = asyncHandler(async (req: Request, res: Response) => {
    // get loggedin user
    const user = req.user;

    // post id
    const postId = Number(req.params.postId);

    // validate post id
    if (Number.isNaN(postId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid post id"
        )
    }

    // find post
    const post = await postRepository.findOne({
        where: { id: postId },
    })

    // validate post exists
    if (!post) {
        return sendResponse(
            res,
            404,
            false,
            "Post not found"
        )
    }

    // Check if user already liked the post
    const existingLike = await likeRepository.findOne({
        where: {
            user: { id: user.id },
            post: { id: post.id }
        },
    })

    if (existingLike) {
        return sendResponse(
            res,
            400,
            false,
            "You already liked this post"
        )
    }

    // create like
    const like = likeRepository.create({
        user,
        post
    })

    // save like
    await likeRepository.save(like);

    // return response
    return sendResponse(
        res,
        201,
        true,
        "User liked this post"
    )
})

// unlikePost controller
export const unlikePost = asyncHandler(async (req: Request, res: Response) => {
    // get user
    const user = req.user;

    // get postId
    const postId = Number(req.params.postId);

    // validate postId
    if (Number.isNaN(postId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid post id"
        )
    }

    // find post
    const post = await postRepository.findOne({
        where: { id: postId }
    })

    // validate post exists
    if (!post) {
        return sendResponse(
            res,
            404,
            false,
            "Post not found"
        )
    }

    // validate like existance
    const existingLike = await likeRepository.findOne({
        where: {
            user: { id: user.id },
            post: { id: post.id }
        }
    })

    if (!existingLike) {
        return sendResponse(
            res,
            400,
            false,
            "Post already unliked"
        )
    }

    // remove like
    await likeRepository.remove(existingLike)

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Post unlike successfully"
    )
})

// getPostLikes controller
export const getPostLikes = asyncHandler(async (req: Request, res: Response) => {
    // get post Id from params
    const postId = Number(req.params.postId);

    // validate id
    if (Number.isNaN(postId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid post id"
        )
    }

    // find post
    const post = await postRepository.findOne({
        where: { id: postId }
    })

    // post exists validation
    if (!post) {
        return sendResponse(
            res,
            404,
            false,
            "Post not found"
        )
    }

    // get post likes
    const likes = await likeRepository.find({
        where: {
            post: { id: postId }
        },
        relations: {
            user: true
        },
        select: {
            id: true,
            createdAt: true,
            user: {
                id: true,
                username: true,
                fullName: true,
                profilePicture: true,
                isVerified: true
            }
        }
    })

    // response
    return sendResponse(
        res,
        200,
        true,
        "Likes fetched successfully",
        likes
    )
})

// getLikeStatus controller
export const getLikeStatus = asyncHandler(async (req: Request, res: Response) => {
    // get user
    const user = req.user;

    // get postId
    const postId = Number(req.params.postId);

    // validate post id
    if (Number.isNaN(postId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid post id",
        )
    }

    // find post
    const post = await postRepository.findOne({
        where: { id: postId }
    })

    // validate post exists
    if (!post) {
        return sendResponse(
            res,
            404,
            false,
            "Post not found",
        )
    }

    // check if the user has liked the post
    const like = await likeRepository.findOne({
        where: {
            user: { id: user.id },
            post: { id: postId }
        }
    })

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Like status fetched successfully",
        {
            isLike: !!like
        }
    )
})