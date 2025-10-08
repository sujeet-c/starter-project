import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authHeaders } from '../utils/auth';
import RegistrationPopup from './RegistrationPopup';

export default function RequireRegistration({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [checking, setChecking] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function check() {
      if (!isAuthenticated) {
        setChecking(false);
        return;
      }

      // allow admin immediate access
      const role = user && (user.role || user.user_role || user.roleName);
      if (role && String(role).toLowerCase() === 'admin') {
        setRegistered(true);
        setChecking(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/registration/me', {
          method: 'GET',
          headers: authHeaders()
        });
        const data = await res.json();
        if (res.ok && data.registered) {
          setRegistered(true);
        } else {
          setShowPopup(true);
        }
      } catch (err) {
        console.error('check registration error', err);
      } finally {
        setChecking(false);
      }
    }

    check();
  }, [isAuthenticated, user]);

  if (!isAuthenticated && !checking) {
    // not logged in -> redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (checking) return null; // or a loader

  const handleClose = () => setShowPopup(false);

  const handleSubmit = async (payload) => {
    try {
      const res = await fetch('http://localhost:5000/registration', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setRegistered(true);
        setShowPopup(false);
      } else {
        alert(data.msg || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Registration error');
    }
  };

  if (registered) return children;

  return (
    <>
      <RegistrationPopup open={showPopup} onClose={handleClose} onSubmit={handleSubmit} defaultEmail={user && (user.user_email || user.email)} />
    </>
  );
}
