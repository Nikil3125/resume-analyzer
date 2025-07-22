import React from 'react';
import './Results.css';

const Results = () => {
  return (
    <div className="results-container">
      <h2 className="results-title">Analysis Results</h2>
      <div className="results-score">
        <span>Match Score:</span>
        <strong>--%</strong> {/* Placeholder for score */}
      </div>
      <div className="results-suggestions">
        <span>Suggestions:</span>
        <ul>
          <li>--</li> {/* Placeholder for suggestions */}
        </ul>
      </div>
    </div>
  );
};

export default Results; 