import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import Navbar from './components/Navbar';
import ResumeUpload from './components/ResumeUpload';
import ResumeList from './components/ResumeList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/analyze" element={<ResumeUpload /> } />

        <Route path="/results" element={<Results />} /> 
      </Routes>
    </>
  );
}

export default App;
