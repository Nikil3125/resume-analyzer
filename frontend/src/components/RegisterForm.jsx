import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // Optional: success state
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setSuccess(true);
      alert('Registration successful!');
      // window.location.href = '/analyze'; // or use useNavigate
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
    setLoading(false);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <label className="register-form-label">
        Name:
        <input
          type="text"
          className="register-form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="register-form-label">
        Email:
        <input
          type="email"
          className="register-form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="register-form-label">
        Password:
        <input
          type="password"
          className="register-form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="register-form-submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: '1rem' }}>Registration successful!</div>}
    </form>
  );
};

export default RegisterForm; 