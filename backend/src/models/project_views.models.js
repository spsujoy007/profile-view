import mongoose from "mongoose";

const projectViewsSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    viewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    source: {
        type: String,
    },
    referrer: {
        type: String,
    }
}, { timestamps: true });

export const ProjectView = mongoose.model('ProjectView', projectViewsSchema);

// id integer [pk, not null]
//   projectId varchar [not null]
//   viewerId varchar [not null]
//    source varchar
//   referrer varchar