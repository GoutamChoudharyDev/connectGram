import { AppDataSource } from "../config/datasource.config.js";
import { Comment } from "../entities/comment.entity.js";

export const commentRepository = AppDataSource.getRepository(Comment);