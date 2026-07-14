import { AppDataSource } from "../config/datasource.config.js";
import { User } from "../entities/user.entity.js";

export const userRepository = AppDataSource.getRepository(User);