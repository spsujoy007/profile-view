import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async (req, res, next) => {
    // step 1: get the token from cookies
    // step 2: verify the token
    // step 3: if token is valid, attach the user to req.user and call next()
    // step 4: if token is invalid, return 401 unauthorized error

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            return res.status(401)
            .json(new ApiResponse(401, null, "Unauthorized request, token not found"))
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken._id).select('-password -refreshToken');
    
        // TODO: Frontend should handle the case when access token is expired and try to get a new access token using refresh token. So, if access token is expired, we can check if refresh token is valid and generate a new access token for the user.
        if(!user){
            return res.status(401)
            .json(new ApiResponse(401, null, "Invalid access token"))
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401)
        .json(new ApiResponse(401, {error: error.message}, "Invalid access token"))
    }
})