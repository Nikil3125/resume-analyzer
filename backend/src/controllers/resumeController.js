const path = require('path');
const Resume = require('../models/Resume');
const axios = require('axios');

exports.downloadResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    // Make sure the path is correct and safe
    const filePath = path.join(__dirname, '../../', resume.filePath);
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error downloading file' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Save a new resume analysis result
exports.saveResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    console.log('req.user:', req.user); // Debug log
    const newResume = new Resume({
      user: req.user.userId, // FIXED: use userId from JWT payload
      jobRole: req.body.jobRole,
      jobDescription: req.body.jobDescription,
      filePath: req.file.path,
      // ...other fields
    });
    // Call ML microservice for analysis
    let analysisResult = null;
    try {
      const absolutePath = path.resolve(req.file.path);
      const mlRes = await axios.post('http://127.0.0.1:8000/analyze', {
        filePath: absolutePath,
        jobRole: req.body.jobRole,
        jobDescription: req.body.jobDescription
      });
      analysisResult = mlRes.data;
      newResume.analysis = analysisResult;
    } catch (mlErr) {
      console.error('ML service error:', mlErr.message);
      // Optionally, you can still save the resume without analysis
      newResume.analysis = { error: 'ML service unavailable' };
    }
    await newResume.save();
    res.status(201).json({ message: 'Resume saved successfully', resume: newResume });
  } catch (err) {
    console.error('Save resume error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch analysis history for logged-in user
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user.userId; // Set by auth middleware
    const history = await Resume.find({ user: userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 