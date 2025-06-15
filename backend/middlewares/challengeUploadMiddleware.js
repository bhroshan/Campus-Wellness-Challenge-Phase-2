const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for storing challenge files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = 'backend/uploads/challenges/';
        
        // Determine subdirectory based on file type
        if (file.fieldname === 'challenge_image') {
            uploadPath += 'main/';
        } else if (file.fieldname === 'pdfs') {
            uploadPath += 'pdfs/';
        } else if (file.fieldname === 'images') {
            uploadPath += 'images/';
        }
        
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept images and PDFs
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'challenge_image') {
        // Only allow images for challenge_image
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Challenge image must be an image file.'), false);
        }
    } else if (file.fieldname === 'pdfs') {
        // Only allow PDFs for pdfs field
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed for resources.'), false);
        }
    } else if (file.fieldname === 'images') {
        // Only allow images for images field
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed for resources.'), false);
        }
    } else {
        cb(new Error('Invalid field name.'), false);
    }
};

const challengeUpload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

module.exports = challengeUpload; 