const mongoose = require('mongoose');

const challengesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please write description of challenge'],
    },
    instructions: {
      type: String,
      required: [true, 'Please mention instruction(s) for the given challenge'],
    },
    image: {
      type: String,
      default: null
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Challenge', challengesSchema);
