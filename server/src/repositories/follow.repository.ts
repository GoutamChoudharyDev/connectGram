import { AppDataSource } from "../config/datasource.config.js";
import { Follow } from "../entities/follow.entity.js";

export const followRepository = AppDataSource.getRepository(Follow);