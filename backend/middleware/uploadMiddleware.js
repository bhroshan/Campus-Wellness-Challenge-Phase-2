const multer = require('multer');
const path = require('path');

// Configure storage for challenge resources
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'uploads/challenges/';
    
    // Determine subdirectory based on file type
    if (file.mimetype === 'application/pdf') {
      uploadPath += 'pdfs/';
    } else if (file.mimetype.startsWith('image/')) {
      uploadPath += 'images/';
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow specific file types
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and image files are allowed.'), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload; 