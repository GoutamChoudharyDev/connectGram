import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.utils.js";
import { userRepository } from "../../repositories/user.repository.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { sendResponse } from "../../utils/response.utils.js";

// register user controller
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    // get data from frontend(req.body)
    const { username, email, password, fullName } = req.body;

    // validation
    if (!username || !email || !password || !fullName) {
        throw new Error("All fields are required")
    }

    // Check if username already exists
    const existingUsername = await userRepository.findOne({
        where: { username }
    })

    if (existingUsername) {
        throw new Error("Username already exists")
    }

    // Check if email already exists
    const existingEmail = await userRepository.findOne({
        where: { email }
    })

    if (existingEmail) {
        throw new Error("Email already exists")
    }

    // hashed the password
    const hashedPassword = await hashPassword(password);

    // create user entity
    const user = userRepository.create({
        username,
        email,
        password: hashedPassword,
        fullName
    })

    // Save user
    const savedUser = await userRepository.save(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = savedUser;

    // Send response
    return sendResponse(
        res,
        201,
        true,
        "User registered successfully",
        userWithoutPassword,
    );
});