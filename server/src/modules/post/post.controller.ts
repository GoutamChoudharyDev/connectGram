import { asyncHandler } from "../../utils/async-handler.utils.js";
import { Request, Response } from "express";
import { sendResponse } from "../../utils/response.utils.js";
import { postMediaRepository, postRepository } from "../../repositories/post.repository.js";
import cloudinary from "../../config/cloudinary.config.js";
import { MediaType, PostMedia } from "../../entities/postMedia.entity.js";

// create post controller
export const createPost = asyncHandler(async (req: Request, res: Response) => {
    // get looged in user
    const user = req.user;

    // get data from frontend(req.body)
    const { caption, location } = req.body;

    // get url from req.file
    const files = req.files as Express.Multer.File[];

    // validate files
    if (!files || files.length === 0) {
        return sendResponse(
            res,
            404,
            false,
            "Atleast one file is required"
        )
    }

    // create post
    const post = postRepository.create({
        caption: caption?.trim() || null,
        location: location?.trim() || null,
        user
    })

    // save 
    await postRepository.save(post);

    // array to store post media
    const mediaList: PostMedia[] = [];

    // upload each file
    for (const file of files) {
        const uploadedFile = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
            {
                folder: "connectGram/posts"
            }
        );

        // create media object
        const media = postMediaRepository.create({
            url: uploadedFile.secure_url,
            publicId: uploadedFile.public_id,
            type: uploadedFile.resource_type === "video" ? MediaType.VIDEO : MediaType.IMAGE,
            post
        })

        mediaList.push(media);
    }

    // save all medai 
    await postMediaRepository.save(mediaList);

    // response
    return sendResponse(
        res,
        201,
        true,
        "Post created successfully",
        {
            postId: post.id
        }
    )
})

// get post controller
export const getPost = asyncHandler(async (req: Request, res: Response) => {
    // get postId from req.params
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
        where: { id: postId },
        relations: {
            user: true,
            media: true
        }
    })

    if (!post) {
        return sendResponse(
            res,
            404,
            false,
            "Post not found"
        )
    }

    // postData
    const postData = {
        id: post.id,
        caption: post.caption,
        location: post.location,

        user: {
            id: post.user.id,
            username: post.user.username,
            fullName: post.user.fullName,
            profilePicture: post.user.profilePicture,
            isVerified: post.user.isVerified
        },

        media: post.media.map((item) => ({
            id: item.id,
            url: item.url,
            type: item.type
        })),

        createdAt: post.createdAt
    }

    // response
    return sendResponse(
        res,
        200,
        true,
        "Post fetched successfully",
        postData
    )
})

// get All post controller
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    // get page & limit
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // validate page & limit
    if (page < 1 && limit < 1) {
        return sendResponse(
            res,
            400,
            false,
            "Invalid page or limit"
        )
    }

    // calculate skip
    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await postRepository.findAndCount({
        relations: {
            user: true,
            media: true
        },
        select: {
            id: true,
            caption: true,
            location: true,
            createdAt: true,

            user: {
                id: true,
                username: true,
                fullName: true,
                profilePicture: true,
                isVerified: true
            },

            media: {
                id: true,
                url: true,
                type: true
            }
        },
        order: {
            createdAt: "DESC"
        },
        skip,
        take: limit
    });

    // return response
    return sendResponse(
        res,
        200,
        true,
        "All posts fetched successfully",
        {
            posts,
            pagintion: {
                page,
                limit,
                totalPosts,
                totalPages: Math.ceil(totalPosts / limit)
            }
        }
    )
})

// update post controller
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
    // get user
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

    // get caption and location from req.body
    const { caption, location } = req.body;

    if (caption === undefined && location === undefined) {
        return sendResponse(
            res,
            400,
            false,
            "Atleast one field required"
        )
    }

    // find post
    const post = await postRepository.findOne({
        where: { id: postId },
        relations: {
            user: true
        }
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

    // check ownership
    if (post.user.id !== user.id) {
        return sendResponse(
            res,
            403,
            false,
            "You are not autherized to updated this post"
        )
    }

    // update caption
    if (caption !== undefined) {
        post.caption = caption.trim() || null;
    }

    // update location
    if (location !== undefined) {
        post.location = location.trim() || null;
    }

    // save
    await postRepository.save(post);

    // response
    return sendResponse(
        res,
        200,
        true,
        "Post updated successfully",
        {
            id: post.id,
            caption: post.caption,
            location: post.location,
            updatedAt: post.updatedAt
        }
    )
})

// delete post controller
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    // get user
    const user = req.user;

    // get post id
    const postId = Number(req.params.postId);

    // validate postid
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
        relations: {
            user: true,
            media: true
        }
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

    // check ownership
    if (post.user.id !== user.id) {
        return sendResponse(
            res,
            403,
            false,
            "You are not autherized to delete this post"
        )
    }

    // delete media from Cloudinary
    for (const media of post.media) {
        await cloudinary.uploader.destroy(media.publicId);
    }

    // remove
    await postRepository.remove(post);

    // response
    return sendResponse(
        res,
        200,
        true,
        "Post deleted successfully"
    )
})