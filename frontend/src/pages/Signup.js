import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './LoginSignup.css';
import { setToken } from '../utils/auth';
import { useAuth } from '../context/AuthContext';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/authentication/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      });

      const data = await res.json();
      if (res.ok && data.jwtToken) {
        setToken(data.jwtToken);
        if (auth && auth.login) auth.login(data.jwtToken);
        navigate('/');
      } else {
        alert(data || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Signup error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', color: '#007bff', padding: 0, cursor: 'pointer' }}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
