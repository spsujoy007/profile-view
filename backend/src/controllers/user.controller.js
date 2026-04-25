import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

dotenv.config();

const optionsForAccessToken = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day
}
const optionsForRefreshToken = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
}

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

const sendEmailVerifcation = async (newUser, generatedCode) => {

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
            subject: `Please verify your email - ${new Date().toLocaleDateString()}`, // subject line
            text: `Welcome to ProfileView! Please verify your email Mr/Ms. ${newUser?.first_name} ${newUser.last_name}.`, // plain text body
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#0b0f14; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="100%" max-width="500px" cellpadding="0" cellspacing="0"
          style="background:#111827; border-radius:16px; padding:30px; border:1px solid #1f2937; box-shadow:0 10px 30px rgba(0,0,0,0.5);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">
                Profiles<span style="color:#FF8225;">View</span>
              </h1>
              <p style="color:#9ca3af; font-size:13px; margin-top:5px;">
                Email Verification
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="color:#e5e7eb; font-size:14px; padding-bottom:20px;">
              <p style="margin:0;">Hi <strong>${newUser?.first_name} ${newUser?.last_name}</strong>,</p>
              <p style="margin-top:10px;">
                Thanks for joining ProfileView. Please use the verification code below to complete your signup.
              </p>
            </td>
          </tr>

          <!-- Code Box -->
          <tr>
            <td align="center" style="padding:25px 0;">
              <div style="
                display:inline-block;
                padding:15px 30px;
                background:#000000;
                border:1px solid #374151;
                border-radius:12px;
                font-size:28px;
                font-weight:bold;
                letter-spacing:6px;
                color:#ffffff;
              ">
                ${generatedCode}
              </div>
            </td>
          </tr>

          <!-- Expiry -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="color:#f87171; font-size:13px; margin:0;">
                This code will expire in 3 minutes.
              </p>
            </td>
          </tr>

          <!-- Info -->
          <tr>
            <td style="color:#9ca3af; font-size:13px; line-height:1.6;">
              <p style="margin:0;">
                If you didn’t request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:25px; text-align:center; font-size:12px; color:#6b7280;">
              © ${new Date().getFullYear()} ProfileView. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

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


const verifyAndRegisterUser = asyncHandler( async ( req, res ) => {
    const { email, code } = req.body;

    if(!email || !code){
        return res
        .status(400)
        .json(new ApiResponse(400, null, "Email and code are required"))
    };

    const existedUser = await User.findOne({email});

    if(!isUserExist){
        return res
        .status(404)
        .json(new ApiResponse(404, null, "User not found with this email"))
    }

    if(isUserExist.isVerified){
        return res
        .status(400)
        .json(new ApiResponse(400, null, "User already verified with this email"))
    }

    const getInfo = await jwt.verify(isUserExist.email, process.env.EMAIL_VERIFICATION_SECRET, (err, decoded) => { 
        if(err){
            return res.status(400)
            .json(new ApiResponse(400, null, "Invalid or expired verification code"));
        }
    })

    if(!getInfo){
        return res.status(400)
        .json(new ApiResponse(400, null, "Invalid or expired verification code"));
    }
    
    const isUserWaitForVerification = await jwt.verify(email, process.env.EMAIL_VERIFICATION_SECRET, (err, decoded) => {
        if(err){
            return res.status(400)
            .json(new ApiResponse(400, null, "Invalid or expired verification code"));
        }
    });
})

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

    // TODO: We can move the code for generating verification code and verification info to a separate function and also we can move the code for sending email to a separate function. This will make our code more modular and reusable.

    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit code
    const salt = bcrypt.genSaltSync(10);
    const generateEncryptedVerificationCode = bcrypt.hashSync(generatedCode, salt); // Generate a random 6-digit code

    const generateVerificationInfo = jwt.sign(
        { 
            first_name,
            last_name,
            email, 
            code: generateEncryptedVerificationCode 
        },
            process.env.EMAIL_VERIFICATION_SECRET,
        { expiresIn: '3m' }
    ); 
    
    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        expiresAt: Date.now() + 3 * 60 * 1000, // Set expiry time for the verification code (3 minutes)
        username: email.split('@')[0],
    })

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if(!createdUser){
        return res.status(500)
        .json(new ApiResponse(500, null, "Failed to create user"))
    }

    await sendEmailVerifcation(createdUser, generatedCode);
    
    res.status(201)
    .json(new ApiResponse(
        201, {
            'user':  createdUser,
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

    res.status(200)
    .cookie("accessToken", accessToken, optionsForAccessToken)
    .cookie("refreshToken", refreshToken, optionsForRefreshToken)
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

const changePassword = asyncHandler( async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if([ oldPassword, newPassword, confirmNewPassword ].some(field => !field)){
        return res
        .status(400)
        .json(new ApiResponse(400, null, "All fields are required"));
    }
    
    const user = await User.findById(req.user._id);

    // compare the old password
    const isPasswordMatched = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordMatched){
        return res
        .status(401)
        .json(new ApiResponse(401, null, "The old password you entered is incorrect"))
    }

    if(newPassword !== confirmNewPassword) {
        return res
        .status(400)
        .json(new ApiResponse(400, null, "New password and confirm new password do not match"))
    }

    if(newPassword === oldPassword){
        return res
        .status(400)
        .json(new ApiResponse(400, null, "New password cannot be the same as old password"))
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"))
    
})

const updateProfile = asyncHandler( async ( req, res ) => {
    const { first_name, last_name, username, bio } = req.body;

    const DU = req.user; // Default User (DU) is the currently authenticated user whose profile is being updated
    const updateUser = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            first_name: first_name || DU.first_name,
            last_name: last_name || DU.last_name,
            username: username || DU.username,
            bio: bio || DU.bio
        }
    }, { new: true })
    .select('-password -refreshToken');

    return res
    .status(200)
    .json(new ApiResponse(200, {
        user: updateUser
    }, "Profile updated successfully"))
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

        return res
        .status(200)
        .cookie("refreshToken", refreshToken, optionsForRefreshToken)
        .cookie("accessToken", accessToken, optionsForAccessToken)
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

export { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword, updateProfile, verifyAndRegisterUser }