import { Post } from "../entities/post.entity.js";
import { PostMedia } from "../entities/postMedia.entity.js";
import { AppDataSource } from "../config/datasource.config.js";

export const postRepository = AppDataSource.getRepository(Post);
export const postMediaRepository = AppDataSource.getRepository(PostMedia);