const mongoose = require('mongoose');

const challengeParticipationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users'
        },
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Challenge'
        }
    },
    {
        timestamps: true
    }
);

// Compound index to ensure a user can't join the same challenge multiple times
challengeParticipationSchema.index({ user: 1, challenge: 1 }, { unique: true });

module.exports = mongoose.model('ChallengeParticipation', challengeParticipationSchema); 