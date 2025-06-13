const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const challengeUpload = require('../middlewares/challengeUploadMiddleware');

const {
  getChallenges,
  setChallenge,
  updateChallenge,
  deleteChallenge,
  getChallenge,
} = require('../controllers/challengeController');

const {
  joinChallenge,
  leaveChallenge,
  checkJoinStatus,
  getJoinedChallenges,
  listNotEnrolledStudents,
  bulkEnrollStudents,
} = require('../controllers/challengeParticipationController');

// Challenge participation routes - specific routes first
router.get('/joined', protect, getJoinedChallenges);

// Challenge CRUD routes
router.post('/', protect, challengeUpload.single('challenge_image'), setChallenge);
router.get('/', protect, getChallenges);

// Routes with parameters should come last
router.delete('/:id', protect, deleteChallenge);
router.put('/:id', protect, challengeUpload.single('challenge_image'), updateChallenge);
router.get('/:id', protect, getChallenge);
router.post('/:id/join', protect, joinChallenge);
router.delete('/:id/join', protect, leaveChallenge);
router.get('/:id/joined', protect, checkJoinStatus);
router.get('/:id/not-enrolled-students', protect, listNotEnrolledStudents);
router.post('/:id/enroll', protect, bulkEnrollStudents);

module.exports = router;
