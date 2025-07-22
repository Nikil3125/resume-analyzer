const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  // Add this field if not present:
  filePath: {
    type: String,
    required: true,
  },
  analysis: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  // ...other fields (e.g., analysis results)
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema); 