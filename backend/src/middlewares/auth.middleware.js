import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// we use _ when we don't need to use the parameter, in this case, we don't need to use res, so we can use _ to indicate that we are not using it. This is a common convention in JavaScript to indicate that a parameter is intentionally unused.
export const verifyJWT = asyncHandler( async (req, _, next) => {
    // step 1: get the token from cookies
    // step 2: verify the token
    // step 3: if token is valid, attach the user to req.user and call next()
    // step 4: if token is invalid, return 401 unauthorized error

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new Error("Access token not found")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken._id).select('-password -refreshToken');
    
        // TODO: Frontend should handle the case when access token is expired and try to get a new access token using refresh token. So, if access token is expired, we can check if refresh token is valid and generate a new access token for the user.
        if(!user){
            throw new Error("Invalid access token")
        }
        
        req.user = user;
        next();
    } catch (error) {
        throw new Error("Invalid access token")
    }
})