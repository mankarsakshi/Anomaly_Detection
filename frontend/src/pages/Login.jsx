// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import bgImage from '../assets/background.jpg'; 
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation
    if (username && password) {
      navigate('/dashboard');
    } else {
      alert("Please fill in both fields");
    }
  };

  return (
    <div 
      className="login-page-container fixed inset-0" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-card">
        <h2>Welcome</h2>
        <form onSubmit={handleLogin}>
          <div className="input-field">
            <input 
              type="text" 
              placeholder="Username" 
              required 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input 
              type="password" 
              placeholder="Password" 
              required 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
          
          <div className="footer-links">
            <a href="#forgot">Forgot Password?</a>
            <div className="remember-me">
              <input type="checkbox" id="rem" />
              <label htmlFor="rem">Remember Me</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;