import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.utils.js";
import { userRepository } from "../../repositories/user.repository.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { sendResponse } from "../../utils/response.utils.js";
import { generateOTP } from "../../utils/generate-otp.js";
import { emailVerificationRepository } from "../../repositories/emailVerification.repository.js";
import { sendEmail } from "../../utils/send-email.utils.js";
import { verificationEmailTemplate } from "../../templates/verification-email.js";

// register user controller
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    // get data from frontend(req.body)
    const { username, email, password, fullName } = req.body;

    // validation
    if (!username || !email || !password || !fullName) {
        return sendResponse(
            res,
            400,
            false,
            "All fields are required"
        )
    }

    // password validation
    if (password.length < 6) {
        return sendResponse(
            res,
            400,
            false,
            "Password must be atleast 6 character"
        )
    }

    // Check if username already exists
    const existingUsername = await userRepository.findOne({
        where: { username }
    })

    if (existingUsername) {
        return sendResponse(
            res,
            409,
            false,
            "Username already exists"
        )
    }

    // Check if email already exists
    const existingEmail = await userRepository.findOne({
        where: { email }
    })

    if (existingEmail) {
        return sendResponse(
            res,
            409,
            false,
            "Email already exists"
        )
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

    // generate otp
    const otp = generateOTP();
    console.log("otp : ", otp);

    // expiry of an otp
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // save otp in db
    const verification = emailVerificationRepository.create({
        otp,
        expiresAt,
        user: savedUser
    })

    await emailVerificationRepository.save(verification);

    // send email
    await sendEmail(
        savedUser.email,
        "Verify your ConnectGram account",
        verificationEmailTemplate(savedUser.fullName, otp)
    )

    // Send response
    return sendResponse(
        res,
        201,
        true,
        "User registered successfully",
        userWithoutPassword,
    );
});


// joi validation