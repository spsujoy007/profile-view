import mongoose from "mongoose";

const analyticsEventSchema = new mongoose.Schema({}, { timestamps: true });
analyticsEventSchema.add({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    viewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    targetType: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    isUnique: {
        type: Boolean
    },
    source: {
        type: String
    },
    referrer: {
        type: String
    }
});

export const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventSchema);

//   id varchar [pk, not null]
//   ownerId varchar [not null]
//   viewerId varchar
//   targetId varchar [not null]
//   targetType varchar [not null]
//   eventType varchar [not null]
//   isUnique boolean
//   source varchar
//   referrer varchar
//   createdAt date