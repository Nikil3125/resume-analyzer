import React from 'react';
import './ResumeList.css';

const ResumeList = () => {
  // Placeholder data
  const analyses = [
    { id: 1, jobRole: 'Software Engineer', score: 85, date: '2024-06-01' },
    { id: 2, jobRole: 'Data Scientist', score: 72, date: '2024-05-28' },
  ];

  return (
    <div className="resume-list-container">
      <h3 className="resume-list-title">Past Analyses</h3>
      <ul className="resume-list">
        {analyses.map((item) => (
          <li key={item.id} className="resume-list-item">
            <span>{item.jobRole}</span> - <span>{item.score}%</span> <span>({item.date})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList; 