import mongoose from "mongoose";

const profileVisitsSchema = new mongoose.Schema({
    visitor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visited_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isUnique: {
        type: Boolean,
        default: true,
    },
    source: {
        type: String,
    },
    referrer: {
        type: String,
    }
}, { timestamps: true });

export const ProfileVisit = mongoose.model("ProfileVisit", profileVisitsSchema);

//   id varchar [pk, not null]
//   visitor_id varchar [not null]
//   visited_id varchar [not null]
//   createdAt time
//   isUnique varchar [not null]
//   source varchar
//   referrer varchar