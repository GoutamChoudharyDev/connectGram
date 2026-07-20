import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";
import { postRepository } from "../../repositories/post.repository.js";
import { commentRepository } from "../../repositories/comment.repository.js";

// get comment controller
export const getComments = asyncHandler(async (req: Request, res: Response) => {
    // postId from params
    const postId = Number(req.params.postId)

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

    // get comments
    const comments = await commentRepository.find({
        where: {
            post: { id: postId }
        },
        relations: {
            user: true,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
                id: true,
                username: true,
                profilePicture: true
            }
        },
        order: {
            createdAt: "DESC"
        }
    })

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Comments fetched successfully",
        comments
    )
})

// get reply comment controller
export const getReplyComments = asyncHandler(async (req: Request, res: Response) => {
    // get parent comment id from params
    const commentId = Number(req.params.commentId);

    // validate parent comment id
    if (Number.isNaN(commentId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid comment id"
        )
    }

    // find parent comment
    const parentComment = await commentRepository.findOne({
        where: { id: commentId }
    })

    // validate parent comment exists
    if (!parentComment) {
        return sendResponse(
            res,
            404,
            false,
            "Parent comment not found"
        )
    }

    // fetch reply comments
    const replies = await commentRepository.find({
        where: {
            parentComment: {
                id: commentId
            }
        },
        relations: {
            user: true
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
                id: true,
                username: true,
                profilePicture: true
            }
        },
        order: {
            createdAt: "ASC"
        }
    })

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Fetched replies successfully",
        replies
    )
})

// add comment controller
export const addComment = asyncHandler(async (req: Request, res: Response) => {
    // get logged in user
    const user = req.user;

    // postId from params
    const postId = Number(req.params.postId)

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

    // get content from req.body
    const { content } = req.body;

    // validate content
    if (typeof content !== "string" || !content.trim()) {
        return sendResponse(
            res,
            400,
            false,
            "Content is required"
        )
    }

    // create comment
    const comment = commentRepository.create({
        content: content.trim(),
        post: { id: postId },
        user: { id: user.id }
    })

    // save in DB
    await commentRepository.save(comment);

    // return response
    return sendResponse(
        res,
        201,
        true,
        "Comment created successfully",
        comment
    )
})

// update comment controller
export const updateComment = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // get comment id from params
    const commentId = Number(req.params.commentId);

    // validate comment id
    if (Number.isNaN(commentId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid comment id"
        )
    }

    // find comment with user relation
    const comment = await commentRepository.findOne({
        where: { id: commentId },
        relations: {
            user: true
        },
    })

    // validate comment exists
    if (!comment) {
        return sendResponse(
            res,
            404,
            false,
            "Comment not found"
        )
    }

    // check comment owner
    if (comment.user.id !== user.id) {
        return sendResponse(
            res,
            403,
            false,
            "You are not authorized to update this comment"
        );
    }

    // get updated content from req.body
    const { content } = req.body;

    if (typeof content !== "string" || !content.trim()) {
        return sendResponse(
            res,
            400,
            false,
            "Content is required"
        );
    }

    // update comment
    comment.content = content.trim();

    // save updated comment
    await commentRepository.save(comment);

    // fetch updated comment with required fields
    const updatedComment = await commentRepository.findOne({
        where: { id: comment.id },
        relations: {
            user: true
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
                id: true,
                username: true,
                profilePicture: true
            }
        }
    });

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Comment updated successfully",
        updatedComment
    )
})

// delete comment controller
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    // get logged in user
    const user = req.user;

    // postId from params
    const commentId = Number(req.params.commentId);

    // validate post id
    if (Number.isNaN(commentId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid comment id"
        )
    }

    // find post
    const comment = await commentRepository.findOne({
        where: { id: commentId },
        relations: {
            user: true
        }
    })

    // validate post exists
    if (!comment) {
        return sendResponse(
            res,
            404,
            false,
            "Comment not found"
        )
    }

    if (comment.user.id !== user.id) {
        return sendResponse(
            res,
            403,
            false,
            "You are not authorized to delete this comment"
        );
    }

    // remove comment
    await commentRepository.remove(comment)

    // return response
    return sendResponse(
        res,
        200,
        true,
        "Comment deleted successfully",
    )
})

// reply comment controller
export const replyComment = asyncHandler(async (req: Request, res: Response) => {
    // get authenticated user
    const user = req.user;

    // get parent comment id from params
    const commentId = Number(req.params.commentId);

    // validate comment id
    if (Number.isNaN(commentId)) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid parent comment id"
        )
    }

    // find parent comment
    const parentComment = await commentRepository.findOne({
        where: { id: commentId },
        relations: {
            post: true
        }
    })

    // validate parent comment exists
    if (!parentComment) {
        return sendResponse(
            res,
            404,
            false,
            "Parent comment is not found"
        )
    }

    // get content from req.body
    const { content } = req.body;

    // validate content
    if (typeof content !== "string" || !content.trim()) {
        return sendResponse(
            res,
            400,
            false,
            "Content is required"
        )
    }

    // create reply comment
    const reply = commentRepository.create({
        content: content.trim(),
        user: { id: user.id },
        post: { id: parentComment.post.id },
        parentComment: { id: parentComment.id }
    })

    // save reply
    await commentRepository.save(reply);

    // fetch reply with required user fields
    const savedReply = await commentRepository.findOne({
        where: { id: reply.id },
        relations: {
            user: true
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            user: {
                id: true,
                username: true,
                profilePicture: true
            }
        }
    });

    // return response
    return sendResponse(
        res,
        201,
        true,
        "Reply add successfully",
        savedReply
    )
})