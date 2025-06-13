const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/users');

//@desc     Register a new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  //check if req.body exists
  if (!req.body) {
    res.status(400);
    throw new Error('Request body is missing');
  }
  const { first_name, last_name, email, role, password, gender } = req.body;

  if (!first_name || !last_name || !email || !role || !password || !gender) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Get profile image path if uploaded
  const profile_image = req.file ? `/uploads/profiles/${req.file.filename}` : null;

  //Create user
  const user = await User.create({
    first_name,
    last_name,
    email,
    role,
    password: hashedPassword,
    gender,
    profile_image
  });

  console.log('New user saved:', user);

  if (user) {
    res.status(201).json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      profile_image: user.profile_image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc     Authenticate a user
//@route    POST /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  //Destructuring the credentials user is giving while login
  const { email, password } = req.body;

  //Check if the user exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      profile_image: user.profile_image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

//@desc     Get user data
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, first_name, last_name, email, role, gender, profile_image } =
    await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    first_name,
    last_name,
    email,
    role,
    gender,
    profile_image,
  });
});

//Generating JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '20d',
  });
};
module.exports = { registerUser, loginUser, getMe };
