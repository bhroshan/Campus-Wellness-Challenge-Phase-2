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
    // Exclude joined challenges
    challenges = await Challenge.find({ _id: { $nin: joinedIds } });
  }else{
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

  const { title, description, instructions } = req.body;

  if (!title || !description || !instructions) {
    res.status(400);
    throw new Error('Please fill out all required fields (title, description, and instructions)');
  }

  const challenge = await Challenge.create({
    title,
    description,
    instructions,
    image: req.file ? `/uploads/challenges/${req.file.filename}` : null,
    user: req.user.id,
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

  const updateData = {
    ...req.body
  };

  if (req.file) {
    updateData.image = `/uploads/challenges/${req.file.filename}`;
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

//@desc     Get single challenge
//@route    GET /api/challenges/:id
//@access   Private
const getChallenge = asyncHandler(async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  if (!challenge) {
    res.status(404);
    throw new Error('Challenge not found');
  }

  res.status(200).json(challenge);
});

module.exports = {
  getChallenges,
  setChallenge,
  updateChallenge,
  deleteChallenge,
  getChallenge,
};
