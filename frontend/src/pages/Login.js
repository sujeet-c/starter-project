import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './LoginSignup.css';
import { setToken } from '../utils/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    console.log('Login component mounted');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/authentication/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.jwtToken) {
        setToken(data.jwtToken);
        // update context
        if (auth && auth.login) auth.login(data.jwtToken);
        navigate('/');
      } else {
        alert(data || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login error');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Register Here?{' '}
        <NavLink to="/signup" style={{ color: '#007bff' }}>SignUp</NavLink>
      </p>
    </div>
  );
};

export default Login;
