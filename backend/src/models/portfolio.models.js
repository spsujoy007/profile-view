import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: "My Portfolio",
        maxlength: 100
    },
    subtitle: {
        type: String,
    },
    description: {
        type: String
    },
    backgroundImage: {
        type: String
    },
    themeColor: {
        type: String
    },
    websiteUrl: {
        type: String
    },
    resumeUrl: {
        type: String
    },
    isFeatured: {
        type: Boolean
    },
    isPublic: {
        type: Boolean
    }
}, { timestamps: true });

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);

//  id varchar [pk, not null]
//   userId varchar [not null]
//   title varchar
//   subtitle varchar
//   description text
//   backgroundImage varchar
//   themeColor varchar
//   websiteUrl varchar
//   resumeUrl varchar
//   isFeatured boolean
//   isPublic boolean
//   createdAt date
//   updatedAt date