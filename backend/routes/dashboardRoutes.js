const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { getStudentStats, getCoordinatorStats } = require('../controllers/dashboardController');

router.get('/student', protect, getStudentStats);
router.get('/coordinator', protect, getCoordinatorStats);

module.exports = router; 