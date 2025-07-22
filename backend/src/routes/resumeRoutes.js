const express = require('express');
const router = express.Router();
const { saveResume } = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/fileUpload'); // Import the upload middleware
const { downloadResume } = require('../controllers/resumeController');
const path = require('path');
const Resume = require('../models/Resume');

router.get('/download/:id', authMiddleware, downloadResume);

router.post('/save', authMiddleware, upload.single('resume'), saveResume);
// router.get('/history', authMiddleware, getHistory);

module.exports = router; 