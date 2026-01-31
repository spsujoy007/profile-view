import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        required: true,
        unique: true
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
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if(!this.isModified('password')) return next();

    // Hash password logic can be added here
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

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