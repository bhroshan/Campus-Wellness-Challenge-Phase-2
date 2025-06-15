const asyncHandler = require('express-async-handler');

const Challenge = require('../models/challenge');
const User = require('../models/users');
const ChallengeParticipation = require('../models/challengeParticipation');

//@desc     Get challenge (s)
//@route    GET /api/challenges
//@access   Private
const getChallenges = asyncHandler(async (req, res) => {
  let challenges;
  if(req.user.role === 'student'){
    // Find all challenge IDs the student has joined
    const participations = await ChallengeParticipation.find({ user: req.user.id });
    const joinedIds = participations.map(p => p.challenge.toString());
    console.log(joinedIds);
    // Get all challenges
    challenges = await Challenge.find({ _id: { $nin: joinedIds } });
  } else {
    challenges = await Challenge.find({user: req.user.id});
  }
  res.status(200).json(challenges);
});

//@desc     Set challenge (s)
//@route    POST /api/challenges
//@access   Private
const setChallenge = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Request body is missing');
  }

  const { title, description, instructions, links } = req.body;

  if (!title || !description || !instructions) {
    res.status(400);
    throw new Error('Please fill out all required fields (title, description, and instructions)');
  }

  // Process uploaded files
  const pdfs = req.files?.pdfs ? req.files.pdfs.map(file => ({
    name: file.originalname,
    path: `/uploads/challenges/pdfs/${file.filename}`
  })) : [];

  const images = req.files?.images ? req.files.images.map(file => ({
    name: file.originalname,
    path: `/uploads/challenges/images/${file.filename}`
  })) : [];

  // Process links
  const parsedLinks = links ? JSON.parse(links) : [];

  const challenge = await Challenge.create({
    title,
    description,
    instructions,
    image: req.files?.challenge_image ? `/uploads/challenges/main/${req.files.challenge_image[0].filename}` : null,
    user: req.user.id,
    resources: {
      pdfs,
      images,
      links: parsedLinks
    }
  });

  res.status(200).json(challenge);
});

//@desc     Update challenge (s)
//@route    PUT /api/challenges/:id
//@access   Private
const updateChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(400);
    throw new Error('Challenge not found');
  }

  const user = await User.findById(req.user.id);

  //Check for User exists or not
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Only login user matches the challenge user
  if (challenge.user.toString() != user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const { title, description, instructions, links } = req.body;

  // Process uploaded files
  const pdfs = req.files?.pdfs ? req.files.pdfs.map(file => ({
    name: file.originalname,
    path: `/uploads/challenges/pdfs/${file.filename}`
  })) : [];

  const images = req.files?.images ? req.files.images.map(file => ({
    name: file.originalname,
    path: `/uploads/challenges/images/${file.filename}`
  })) : [];

  // Process links
  const parsedLinks = links ? JSON.parse(links) : [];

  const updateData = {
    title,
    description,
    instructions,
    resources: {
      pdfs: [...(challenge.resources?.pdfs || []), ...pdfs],
      images: [...(challenge.resources?.images || []), ...images],
      links: parsedLinks
    }
  };

  if (req.files?.challenge_image) {
    updateData.image = `/uploads/challenges/main/${req.files.challenge_image[0].filename}`;
  }

  const updatedChallenge = await Challenge.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
    }
  );

  res.status(200).json(updatedChallenge);
});

//@desc     Delete challenge (s)
//@route    Delete /api/challenges/:id
//@access   Private
const deleteChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  //Check if Logged in user exits
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  //only allow the owner to delete the challenge
  if (challenge.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await challenge.deleteOne();

  res.status(200).json({
    message: 'Challenge deleted successfully',
    id: req.params.id,
  });
});

// @desc    Get challenge by ID
// @route   GET /api/challenges/:id
// @access  Private
const getChallenge = asyncHandler(async (req, res) => {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
        res.status(404);
        throw new Error('Challenge not found');
    }

    // Check if user is a coordinator
    const user = await User.findById(req.user.id);
    const isCoordinator = user.role === 'coordinator';

    // If user is not a coordinator, check if they have joined the challenge
    let joined = false;
    let completed = false;
    if (!isCoordinator) {
        const challengeParticipation = await ChallengeParticipation.findOne({
            user: req.user.id,
            challenge: req.params.id
        });
        joined = !!challengeParticipation;
        completed = challengeParticipation?.completed;
    }

    // If user is not a coordinator and hasn't joined, remove resources
    if (!isCoordinator && !joined) {
        challenge.resources = {
            pdfs: [],
            images: [],
            links: []
        };
    }

    res.json({
        ...challenge.toObject(),
        joined,
        completed
    });
});

// @desc    Mark challenge as completed
// @route   PUT /api/challenges/:id/complete
// @access  Private
const markChallengeCompleted = asyncHandler(async (req, res) => {
    const challengeParticipation = await ChallengeParticipation.findOne({
        user: req.user.id,
        challenge: req.params.id
    });

    if (!challengeParticipation) {
        res.status(404);
        throw new Error('Challenge participation not found');
    }

    challengeParticipation.completed = true;
    await challengeParticipation.save();

    res.status(200).json({
        message: 'Challenge marked as completed',
        completed: true
    });
});

// @desc    Revert challenge completion
// @route   PUT /api/challenges/:id/revert
// @access  Private
const revertChallengeCompletion = asyncHandler(async (req, res) => {
    const challengeParticipation = await ChallengeParticipation.findOne({
        user: req.user.id,
        challenge: req.params.id
    });

    if (!challengeParticipation) {
        res.status(404);
        throw new Error('Challenge participation not found');
    }

    challengeParticipation.completed = false;
    await challengeParticipation.save();

    res.status(200).json({
        message: 'Challenge completion reverted',
        completed: false
    });
});

module.exports = {
  getChallenges,
  setChallenge,
  updateChallenge,
  deleteChallenge,
  getChallenge,
  markChallengeCompleted,
  revertChallengeCompletion
};
