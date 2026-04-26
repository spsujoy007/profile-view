import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        url: String,
        public_id: String,
    },
    cover: {
        url: String,
        public_id: String,
    },
    bio: {
        type: String,
        maxlength: 160
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastLoginAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiresAt: Date, // Field to store the expiry time for the verification code
    refreshToken: String
}, { timestamps: true });


// Pre-save hook to hash password before saving
userSchema.pre('save', function () {
    if(!this.isModified('password')) return  // If password is not modified, proceed without hashing

    // Hash password logic can be added here
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    
})

// Index to automatically delete documents after the specified expiry time
userSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// Method to compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Returns true if passwords match
}

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        name: `${this.first_name} ${this.last_name}`
    }, 
        process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
    return token;
}

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign({
        _id: this._id,
        username: this.username
    }, 
        process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
    return token;
}


export const User = mongoose.model('User', userSchema);


//   id varchar [pk, not null]
//   first_name text [not null]
//   last_name text [not null]
//   email text [not null, unique]
//   username text [not null, unique]
//   password text [not null]
//   avatar text
//   cover text
//   bio varchar
//   createdAt timestamp [not null]
//   isVerified boolean [not null]
//   lastLoginAt timestamp [not null]
//   isActive boolean