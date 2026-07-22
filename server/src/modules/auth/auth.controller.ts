import { Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler.utils.js";
import { userRepository } from "../../repositories/user.repository.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { sendResponse } from "../../utils/response.utils.js";
import { generateOTP } from "../../utils/generate-otp.js";
import { emailVerificationRepository } from "../../repositories/emailVerification.repository.js";
import { sendEmail } from "../../utils/send-email.utils.js";
import { verificationEmailTemplate } from "../../templates/verification-email.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokens.utils.js";
import { cookiesOptions } from "../../utils/cookies-options.utils.js";

import jwt from "jsonwebtoken";
import { env } from "../../config/env.config.js";

// register user controller(todo: joi validation for email)
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

// verify email controller
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    // get email and otp from req.body
    const { email, otp } = req.body;

    // validation
    if (!email || !otp) {
        return sendResponse(
            res,
            400,
            false,
            "Email and OTP are required"
        )
    }

    // find user
    const user = await userRepository.findOne({
        where: { email }
    })

    if (!user) {
        return sendResponse(
            res,
            404,
            false,
            "User not found"
        )
    }

    // check if already verified
    if (user.isVerified) {
        return sendResponse(
            res,
            400,
            false,
            "Email is already verified"
        )
    }

    // find email verification record
    const emailVerificationRecord = await emailVerificationRepository.findOne({
        where: {
            user: {
                id: user.id
            }
        },
    })

    if (!emailVerificationRecord) {
        return sendResponse(
            res,
            404,
            false,
            "OTP not found"
        )
    }

    // check otp
    if (emailVerificationRecord.otp !== otp) {
        return sendResponse(
            res,
            401,
            false,
            "Invalid OTP"
        )
    }

    // check otp expiry
    if (emailVerificationRecord.expiresAt < new Date()) {
        return sendResponse(
            res,
            400,
            false,
            "OTP has expired"
        )
    }

    // verify user
    user.isVerified = true;
    await userRepository.save(user);

    // delete otp
    await emailVerificationRepository.remove(emailVerificationRecord);

    // return res
    return sendResponse(
        res,
        200,
        true,
        "OTP verification successfully"
    )
});

// resend otp controller
export const reSendOTP = asyncHandler(async (req: Request, res: Response) => {
    // get email from req.body
    const { email } = req.body;

    // validation
    if (!email) {
        return sendResponse(
            res,
            400,
            false,
            "Email required"
        )
    }

    // check user exists
    const user = await userRepository.findOne({
        where: { email }
    })

    if (!user) {
        return sendResponse(
            res,
            404,
            false,
            "User not found"
        )
    }

    // check user is verified or not
    if (!user.isVerified) {
        return sendResponse(
            res,
            401,
            false,
            "User is not verified"
        )
    }

    // generate new OTP
    const otp = generateOTP();

    // expiry of an otp
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // save otp in db
    const emailVerificationRecord = emailVerificationRepository.create({
        otp,
        expiresAt,
        user
    })

    await emailVerificationRepository.save(emailVerificationRecord);

    // send email
    await sendEmail(
        user.email,
        "Verify your ConnectGram account",
        verificationEmailTemplate(user.fullName, otp)
    )

    return sendResponse(
        res,
        201,
        true,
        "OTP is sended successfully"
    )
})

// login controller : todo(store refresh token in db)
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    // get email and password from (req.body)
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return sendResponse(
            res,
            400,
            false,
            "Email and password is required"
        )
    }

    // find user
    const user = await userRepository.findOne({
        where: { email }
    })

    if (!user) {
        return sendResponse(
            res,
            401,
            false,
            "Invalid credentials"
        )
    }

    // Email verified
    if (!user.isVerified) {
        return sendResponse(
            res,
            401,
            false,
            "User is not verified"
        )
    }

    // compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        return sendResponse(
            res,
            401,
            false,
            "Invalid creadentials"
        )
    }

    // generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // set in cookie
    res.cookie("accessToken", accessToken, {
        ...cookiesOptions,
        maxAge: 10 * 60 * 1000 // 10 min
    })

    res.cookie("refreshToken", refreshToken, {
        ...cookiesOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // remove password from user
    const { password: _, ...userWithoutPassword } = user;

    // return response
    return sendResponse(
        res,
        200,
        true,
        "User logged in successfully",
        userWithoutPassword
    )
})

// payload interface
interface JwtPayload {
    id: number;
}

// access refresh token controller
export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    // get token from cookies
    const token = req.cookies?.refreshToken;

    if (!token) {
        return sendResponse(
            res,
            401,
            false,
            "Unatherized access"
        )
    }

    // verify token
    const decoded = jwt.verify(token, env.REFRESH_SECRET_KEY) as JwtPayload;

    // find user 
    const user = await userRepository.findOne({
        where: { id: decoded.id }
    })

    if (!user) {
        return sendResponse(
            res,
            401,
            false,
            "Unautherized"
        )
    }

    // generate access token
    const accessToken = generateAccessToken(user.id);

    // set in cookies
    res.cookie("accessToken", accessToken, {
        ...cookiesOptions,
        maxAge: 10 * 60 * 1000 // 10 min
    });

    return sendResponse(
        res,
        200,
        true,
        "Access token generated"
    )
})

// logout controller
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    // clear the cookie
    res.clearCookie("accessToken", cookiesOptions)

    res.clearCookie("refreshToken", cookiesOptions)

    return sendResponse(
        res,
        200,
        true,
        "User logged out successfully"
    )
})

// get me controller
export const getMe = asyncHandler(async (req: Request, res: Response) => {
    // get logged in user 
    const user = req.user;

    // remove password
    const { password: _, ...userWithoutPassword } = user;

    return sendResponse(
        res,
        200,
        true,
        "User fetched successfully",
        userWithoutPassword
    )
})