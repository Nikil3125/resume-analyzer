import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Resume Analyzer</h1>
      <p className="home-description">
        Upload your resume, select a job role, and get instant feedback on how well your resume matches the job description!
      </p>
      <div className="home-button-group">
        <Link to="/analyze">
          <button>Analyze Resume</button>
        </Link>
      </div>
    </div>  
  );
};

export default Home; 