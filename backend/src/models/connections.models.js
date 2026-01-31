import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Connection = mongoose.model("Connection", connectionSchema);

//   id text [pk, not null]
//   follower varchar [not null]
//   following varchar [not null]
//   createdAt time