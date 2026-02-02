import mongoose from "mongoose";

const projectLikesSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const ProjectLike = mongoose.model('ProjectLike', projectLikesSchema);

//   id integer [pk, not null]
//   projectId varchar [not null]
//   userId varchar [not null]