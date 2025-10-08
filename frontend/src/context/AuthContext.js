import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { setToken as persistToken, getToken, removeToken as removePersistedToken, authHeaders } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/dashboard', {
        method: 'POST',
        headers: authHeaders()
      });
      const data = await res.json();
      console.log('fetchUser:', res.status, data);
      if (res.ok) {
        setUser(data);
      } else {
        removePersistedToken();
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error('fetchUser error', err);
      removePersistedToken();
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    const ok = !!token;
    setIsAuthenticated(ok);
    if (ok) fetchUser();
  }, [fetchUser]);

  const login = (token) => {
    persistToken(token);
    setIsAuthenticated(true);
    fetchUser().catch(err => {
      console.error('fetchUser (login) error', err);
    });
  };

  const logout = () => {
    removePersistedToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
