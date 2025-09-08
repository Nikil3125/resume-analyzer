import React from 'react';
import './AnalysisReport.css';

const AnalysisReport = ({ analysis, onDownload }) => {
  if (!analysis) return null;

  const {
    score,
    feedback,
    semantic_similarity,
    keyword_match_percentage,
    extracted_skills,
    matched_keywords,
    total_keywords
  } = analysis;

  return (
    <div className="analysis-report ">
      <h2 className="report-title ">Analysis Report</h2>
      
      <div className="report-section score-section">
        <h3>Overall Score</h3>
        <p className="score">{score ? score.toFixed(2) : 'N/A'}%</p>
        <p className="feedback">{feedback}</p>
      </div>

      <div className="report-section details-section">
        <h3>Details</h3>
        <ul>
          <li>Semantic Similarity: <span>{semantic_similarity ? (semantic_similarity * 100).toFixed(2) : 'N/A'}%</span></li>
          <li>Keyword Match: <span>{keyword_match_percentage ? keyword_match_percentage.toFixed(2) : 'N/A'}% ({matched_keywords ? matched_keywords.length : 0}/{total_keywords || 0} keywords)</span></li>
        </ul>
      </div>

      <div className="report-section skills-section">
        <h3>Extracted Skills</h3>
        {extracted_skills && extracted_skills.length > 0 ? (
          <div className="skills-container">
            {extracted_skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        ) : (
          <p>No specific skills extracted.</p>
        )}
      </div>

      <button onClick={onDownload} className="report-download-btn">
        Download Original Resume
      </button>
    </div>
  );
};

export default AnalysisReport; 