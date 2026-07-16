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
    // get post from req.params

    // find post

    // validate

    // response
})

// get All post controller
export const getAllPosts = asyncHandler(async (req: Request, res: Response) => {

})

// update post controller
export const updatePost = asyncHandler(async (req: Request, res: Response) => {

})

// delete post controller
export const deletePost = asyncHandler(async (req: Request, res: Response) => {

})