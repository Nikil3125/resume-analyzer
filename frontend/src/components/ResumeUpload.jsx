import React, { useState } from 'react';
import axios from 'axios';
import './ResumeUpload.css';
import AnalysisReport from './AnalysisReport'; // <-- Import the new component

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null); // <-- New state for analysis

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAnalysisResult(null); // Reset previous results

    if (!file || !jobRole || !jobDescription) {
      setError('Please select a file, a job role and a job description.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobRole', jobRole);
      formData.append('jobDescription', jobDescription);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to upload a resume.');
        setLoading(false);
        return;
      }
      const res = await axios.post(
        'http://localhost:5000/api/resume/save',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysisResult(res.data.resume.analysis); // Store the analysis result
      // Optionally, update results or history here
    } catch (err) {
      setError(
        err.response?.data?.message || 'Upload failed. Please try again.'
      );
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    if (!analysisResult) return; // Should have a resume ID stored somewhere
    // This part needs adjustment. For now, let's assume we store the resume ID
    // when the analysis is done. A better approach would be to have the resume ID
    // available from the state where the full resume object is stored.
    // Let's assume `uploadedResume._id` is available.
    // For the purpose of this example, let's say we get it from `analysisResult`
    // This is a placeholder for a more robust implementation.
    alert("Download functionality would be implemented here, using the resume's ID.");
  };


  return (
    <div className="resume-upload-container">
      <form className="resume-upload-form" onSubmit={handleSubmit}>
        <label className="resume-upload-label">
          Upload Resume (PDF/DOCX):
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="resume-upload-input"
            onChange={handleFileChange}
          />
        </label>
        <label className="resume-upload-label">
          Job Role:
          <input
            type="text"
            className="resume-upload-input"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="e.g., Software Engineer"
          />
        </label>
        <label className="resume-upload-label">
          Job Description:
          <textarea
            className="resume-upload-textarea"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            rows="10"
          />
        </label>
        <button
          type="submit"
          className="resume-upload-submit"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Analyze Resume'}
        </button>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      </form>

      {analysisResult && (
        <AnalysisReport analysis={analysisResult} onDownload={handleDownload} />
      )}
    </div>
  );
};

export default ResumeUpload; 