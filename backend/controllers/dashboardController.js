const asyncHandler = require('express-async-handler');
const Challenge = require('../models/challenge');
const ChallengeParticipation = require('../models/challengeParticipation');
const User = require('../models/users');

// @desc    Get dashboard stats for student
// @route   GET /api/dashboard/student
// @access  Private (Student only)
const getStudentStats = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Only students can access this endpoint');
    }
    const totalChallenges = await Challenge.countDocuments();
    const joinedCount = await ChallengeParticipation.countDocuments({ user: req.user.id });
    res.json({
        totalChallenges,
        joinedCount
    });
});

// @desc    Get dashboard stats for coordinator
// @route   GET /api/dashboard/coordinator
// @access  Private (Coordinator only)
const getCoordinatorStats = asyncHandler(async (req, res) => {
    if (req.user.role !== 'coordinator') {
        res.status(403);
        throw new Error('Only coordinators can access this endpoint');
    }
    // 1. Total number of challenges added by the coordinator
    const myChallenges = await Challenge.find({ user: req.user.id });
    const myChallengesCount = myChallenges.length;
    // 2. Total number of active participants in the coordinator's challenges
    const myChallengeIds = myChallenges.map(ch => ch._id);
    const activeParticipants = await ChallengeParticipation.countDocuments({ challenge: { $in: myChallengeIds } });
    // 3. Total number of challenges in the app (all coordinators)
    const totalChallenges = await Challenge.countDocuments();
    res.json({
        myChallengesCount,
        activeParticipants,
        totalChallenges
    });
});

module.exports = {
    getStudentStats,
    getCoordinatorStats
}; 