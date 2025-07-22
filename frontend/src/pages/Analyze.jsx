import React from 'react';
import './Analyze.css';

const Analyze = () => {
  return (
    <div className="analyze-container">
      <h2 className="analyze-title">Resume Analysis Dashboard</h2>
      {/* Placeholder for ResumeUpload component */}
      <div className="analyze-upload-placeholder">
        <p>Upload your resume and select a job role to begin analysis.</p>
      </div>
      {/* Placeholder for results */}
      <div className="analyze-results-placeholder">
        <p>Results will appear here after analysis.</p>
      </div>
    </div>
  );
};

export default Analyze; 