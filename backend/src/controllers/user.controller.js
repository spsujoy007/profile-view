import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"

dotenv.config();

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password -refreshToken');
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    }
    catch (err) {
        throw new Error("Error while generating tokens: " + err.message);
    }
}

const sendEmailVerifcation = async (newUser) => {

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    });

    try {
        const info = await transporter.sendMail({
            from: '"ProfileView" <sujoypaul728@gmail.com>', // sender address
            to: newUser?.email, // list of recipients
            subject: `Please verify your email`, // subject line
            text: `Welcome to ProfileView! Please verify your email Mr/Ms. ${newUser?.first_name} ${newUser.last_name}.`, // plain text body
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Verification</title>
            </head>
            <body>
                <h1>Email Verification</h1>
                <p>${newUser?.email}</p>
                <p>Thank you for registering with us!</p>
            </body>
            </html>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
        console.error("Error while sending mail:", err);
        }
    
}

const registerUser = asyncHandler( async (req, res) => {
    // step 1: taking user details from request body
    // step 2: validating user details
    // step 3: checking if user already exists in database
    // step 4: hashing the password
    // step 5: saving the user in database
    // step 6: generating a token for the user

    const {first_name, last_name, email, password} = req.body;

    if([first_name, last_name, email, password].some(field => !field)){
        return res.status(400)
        .json(new ApiResponse(400, null, "All fields are required"))
    }

    const existedUser = await User.findOne({ email });

    if(existedUser){
        return res.status(400)
        .json(new ApiResponse(400, {}, "User already exists with this email"))
    }

    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        username: email.split('@')[0],
    })

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if(!createdUser){
        return res.status(500)
        .json(new ApiResponse(500, null, "Failed to create user"))
    }

    await sendEmailVerifcation(createdUser);
    
    res.status(201)
    .json(new ApiResponse(
        201, {
            'user': createdUser,
        }, "User registered successfully"))
})

const loginUser = asyncHandler( async (req, res) => {
    // step 1: taking email and password from request body
    // step 2: validating email and password
    // step 3: checking if user exists in database
    // step 4: comparing the password
    // step 5: generating access token and refresh token for the user
    // step 6: saving the refresh token in database
    // step 7: sending the access token and refresh token to client in httpOnly cookie
    const { email, password } = req.body;

    // validate email and password
    if(!email || !password){
        return res.status(400)
        .json(new ApiResponse(400, null, "Email and password are required"))
    }

    // check if user exists in database
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(404)
        .json(new ApiResponse(404, null, "User not registered with this email"))
    }

    // compare the password
    const isPasswordMatched = await user.isPasswordCorrect(password);
    if(!isPasswordMatched){
        return res.status(401)
        .json(new ApiResponse(401, null, "The password you entered is incorrect"))
    }

    // generate a token for the user
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    console.log(accessToken, refreshToken)
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const options = {
        httpOnly: true,
        secure: true,
    }

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {
        'user': loggedInUser,
        accessToken, refreshToken
    }, "User logged in successfully"))
})

const logoutUser = asyncHandler( async(req, res) => {
    
    const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: null
        }
    }, 
    { new : true })
    console.log(updatedUser)

    res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, null, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler( async (req, res) => {
    // step 1: get the refresh token from cookies
    // step 2: verify the refresh token
    // step 3: if refresh token is valid, generate a new access token and send it to client in httpOnly cookie
    // step 4: if refresh token is invalid, return 401 unauthorized error
    
    const oldRefreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(oldRefreshToken)
    if(!oldRefreshToken){
        return res.status(401)
        .json(new ApiResponse(401, null, "Refresh token not found"))
    }

    try {
        const decodedToken = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const getUser = await User.findById({_id: decodedToken._id});

        if(getUser.refreshToken !== oldRefreshToken){
            throw new Error("Invalid refresh token");
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(decodedToken);

        const options = {
            httpOnly: true,
            secure: true,
        }
        return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json( new ApiResponse(
            200,
            {accessToken, refreshToken},
            "Access token refreshed successfully."
        ))

    }
    catch (error) {
        return res.status(401)
        .json(new ApiResponse(401, null, "Invalid refresh token"))
    }
})

export { registerUser, loginUser, logoutUser, refreshAccessToken }