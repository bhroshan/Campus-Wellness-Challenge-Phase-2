const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.post('/', upload.single('profile_image'), registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;
