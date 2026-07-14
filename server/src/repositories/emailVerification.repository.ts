import { AppDataSource } from "../config/datasource.config.js";
import { EmailVerification } from "../entities/emailVerification.entity.js";

export const emailVerificationRepository = AppDataSource.getRepository(EmailVerification);