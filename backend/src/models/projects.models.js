import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: 500,
        required: true
    },
    techStack: {
        type: [String],
        default: []
    },
    githubUrl: {
        type: String,
    },
    liveUrl: {
        type: String,
    },
    demoVideoUrl: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    images: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        maxlength: 50,
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
        default: 'Planning'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    likesCount: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

export const Project = mongoose.model("Project", projectsSchema);

//   id varchar [pk, not null]
//   userId varchar [not null]
//   title varchar
//   slug varchar
//   description varchar
//   techStack varchar
//   githubUrl varchar
//   liveUrl varchar
//   demoVideoUrl varchar
//   thumbnail varchar
//   images varchar
//   category varchar
//   tags varchar
//   status varchar
//   isFeatured boolean
//   isPublic boolean
//   viewsCount integer
//   likesCount integer
//   createdAt date
//   updatedAt date