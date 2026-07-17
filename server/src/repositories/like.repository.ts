import { AppDataSource } from "../config/datasource.config.js";
import { Like } from "../entities/like.entity.js";

export const likeRepository = AppDataSource.getRepository(Like);