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
  markChallengeCompleted,
  revertChallengeCompletion
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
router.post('/', protect, challengeUpload.fields([
  { name: 'challenge_image', maxCount: 1 },
  { name: 'pdfs', maxCount: 10 },
  { name: 'images', maxCount: 10 }
]), setChallenge);
router.get('/', protect, getChallenges);

// Routes with parameters should come last
router.delete('/:id', protect, deleteChallenge);
router.put('/:id', protect, challengeUpload.fields([
  { name: 'challenge_image', maxCount: 1 },
  { name: 'pdfs', maxCount: 10 },
  { name: 'images', maxCount: 10 }
]), updateChallenge);
router.get('/:id', protect, getChallenge);
router.post('/:id/join', protect, joinChallenge);
router.delete('/:id/join', protect, leaveChallenge);
router.get('/:id/joined', protect, checkJoinStatus);
router.get('/:id/not-enrolled-students', protect, listNotEnrolledStudents);
router.post('/:id/enroll', protect, bulkEnrollStudents);

router.route('/:id/complete')
    .put(protect, markChallengeCompleted);

router.route('/:id/revert')
    .put(protect, revertChallengeCompletion);

module.exports = router;
