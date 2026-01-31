import mongoose from "mongoose";

const profileLinkSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    platform: {
        type: String,
        enum: [
            'Portfolio',
            'Website',

            'GitHub',
            'GitLab',

            'LinkedIn',
            'Twitter',

            'LeetCode',
            'Codeforces',
            'HackerRank',
            'StackOverflow',

            'Dev.to',
            'Hashnode',
            'Medium',

            'Kaggle',
            'ProductHunt',

            'YouTube',

            'Behance',
            'Dribbble',

            'Instagram',
            'Facebook',
            'Reddit'
        ],

        required: true,
    },
    url: {
        type: String,
        required: true,
    }
} , { timestamps: true });

export const ProfileLink = mongoose.model("ProfileLink", profileLinkSchema);

//   id varchar [pk, not null]
//   user_id varchar [unique]
//   platform varchar
//   url text