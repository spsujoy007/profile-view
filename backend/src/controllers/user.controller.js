import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async (req, res) => {
    // step 1: taking user details from request body
    // step 2: validating user details
    // step 3: checking if user already exists in database
    // step 4: hashing the password
    // step 5: saving the user in database
    // step 6: generating a token for the user

    const {first_name, last_name, email, password} = req.body;
    console.log(req.body)

    if([first_name, last_name, email, password].some(field => !field)){
        return res.status(400)
        .json(new ApiResponse(400, null, "All fields are required"))
    }

    const existedUser = await User.findOne({ email, password });

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
    
    res.status(201)
    .json(new ApiResponse(
        201, {
            'user': createdUser,
        }, "User registered successfully"))
})

export { registerUser }