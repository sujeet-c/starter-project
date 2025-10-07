import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const loggedIn = isAuthenticated;
  const [open, setOpen] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    window.location.href = '/';
  };

  const firstLetter = user && user.user_name ? user.user_name.charAt(0).toUpperCase() : '?';

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="navbar-logo">Wigoh Tech</div>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/intake" className={({ isActive }) => (isActive ? "active" : "")}>Client Intake Form</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact Us</NavLink>
          </li>
        </ul>
      </div>

      <div className="nav-right">
        {!loggedIn ? (
          <>
            <NavLink to="/signup" className="signup-btn">Signup</NavLink>
          </>
        ) : (
          <div className="user-area" ref={avatarRef}>
            <div className="user-avatar" onClick={() => setOpen((s) => !s)}>{firstLetter}</div>
            {open && (
              <div className="user-dropdown">
                <div className="user-dropdown-item user-info">
                  <strong>{user && user.user_name}</strong>
                  <div className="small">{user && user.user_email}</div>
                </div>
                <div className="user-dropdown-item">
                  <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
