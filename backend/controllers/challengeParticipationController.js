const asyncHandler = require('express-async-handler');
const ChallengeParticipation = require('../models/challengeParticipation');
const Challenge = require('../models/challenge');

// @desc    Get joined challenges
// @route   GET /api/challenges/joined
// @access  Private (Students only)
const getJoinedChallenges = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Only students can view joined challenges');
    }

    const participations = await ChallengeParticipation.find({ user: req.user.id })
        .populate({
            path: 'challenge',
            select: 'title description instructions image user'
        });

    // Extract challenges from participations and include completion status
    const challenges = participations.map(p => ({
        ...p.challenge.toObject(),
        completed: p.completed
    })).filter(challenge => challenge._id); // Filter out any null challenges

    res.status(200).json(challenges);
});

// @desc    Join a challenge
// @route   POST /api/challenges/:id/join
// @access  Private (Students only)
const joinChallenge = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Only students can join challenges');
    }

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
        res.status(404);
        throw new Error('Challenge not found');
    }

    // Check if already joined
    const existingParticipation = await ChallengeParticipation.findOne({
        user: req.user.id,
        challenge: req.params.id
    });

    if (existingParticipation) {
        res.status(400);
        throw new Error('You have already joined this challenge');
    }

    // Create participation
    const participation = await ChallengeParticipation.create({
        user: req.user.id,
        challenge: req.params.id
    });

    res.status(201).json(participation);
});

// @desc    Leave a challenge
// @route   DELETE /api/challenges/:id/join
// @access  Private (Students only)
const leaveChallenge = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Only students can leave challenges');
    }

    const participation = await ChallengeParticipation.findOneAndDelete({
        user: req.user.id,
        challenge: req.params.id
    });

    if (!participation) {
        res.status(404);
        throw new Error('You have not joined this challenge');
    }

    res.status(200).json({ message: 'Successfully left the challenge' });
});

// @desc    Check if user has joined a challenge
// @route   GET /api/challenges/:id/joined
// @access  Private (Students only)
const checkJoinStatus = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Only students can check challenge join status');
    }

    const participation = await ChallengeParticipation.findOne({
        user: req.user.id,
        challenge: req.params.id
    });

    res.status(200).json({ joined: !!participation });
});

// @desc    List students not enrolled in a challenge
// @route   GET /api/challenges/:id/not-enrolled-students
// @access  Private (Coordinator only)
const listNotEnrolledStudents = asyncHandler(async (req, res) => {
    if (req.user.role !== 'coordinator') {
        res.status(403);
        throw new Error('Only coordinators can access this endpoint');
    }
    const challengeId = req.params.id;
    // Get all students
    const User = require('../models/users');
    const allStudents = await User.find({ role: 'student' });
    // Get all participations for this challenge
    const participations = await ChallengeParticipation.find({ challenge: challengeId });
    const enrolledIds = participations.map(p => p.user.toString());
    // Filter students not enrolled
    const notEnrolled = allStudents.filter(s => !enrolledIds.includes(s._id.toString()));
    res.json(notEnrolled.map(s => ({ _id: s._id, first_name: s.first_name, last_name: s.last_name, email: s.email, profile_image: s.profile_image })));
});

// @desc    Bulk enroll students to a challenge
// @route   POST /api/challenges/:id/enroll
// @access  Private (Coordinator only)
const bulkEnrollStudents = asyncHandler(async (req, res) => {
    if (req.user.role !== 'coordinator') {
        res.status(403);
        throw new Error('Only coordinators can access this endpoint');
    }
    const challengeId = req.params.id;
    const { studentIds } = req.body;
    if (!Array.isArray(studentIds) || studentIds.length === 0) {
        res.status(400);
        throw new Error('No students selected');
    }
    // Filter out already enrolled
    const participations = await ChallengeParticipation.find({ challenge: challengeId, user: { $in: studentIds } });
    const alreadyEnrolledIds = participations.map(p => p.user.toString());
    const toEnroll = studentIds.filter(id => !alreadyEnrolledIds.includes(id));
    // Create participations
    const docs = toEnroll.map(userId => ({ user: userId, challenge: challengeId }));
    await ChallengeParticipation.insertMany(docs);
    res.json({ message: 'Students enrolled successfully', enrolled: toEnroll.length });
});

module.exports = {
    joinChallenge,
    leaveChallenge,
    checkJoinStatus,
    getJoinedChallenges,
    listNotEnrolledStudents,
    bulkEnrollStudents
};