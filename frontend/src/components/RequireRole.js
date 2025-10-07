import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Usage: <RequireRole role="client"> <Intake /> </RequireRole>
export default function RequireRole({ role, children }) {
  const { isAuthenticated, user } = useAuth();

  // debug: log user and required role
  // console.log('RequireRole check', { isAuthenticated, user, required: role });

  if (!isAuthenticated) {
    // not logged in
    return <Navigate to="/" replace />;
  }

  const userRole = user && user.role ? String(user.role).toLowerCase() : null;
  const requiredRole = role ? String(role).toLowerCase() : null;
  // try a few common alternative property names if role isn't present
  let resolvedRole = userRole;
  if (!resolvedRole && user) {
    const alt = user.user_role || user.role_id || user.userrole || user.roleName || user.rolename;
    if (alt !== undefined && alt !== null) resolvedRole = String(alt).toLowerCase();
  }

  // debug log to help identify the key/value returned from backend
  console.debug('RequireRole: resolvedRole=', resolvedRole, 'required=', requiredRole, 'user=', user);

  if (!user || resolvedRole !== requiredRole) {
    // logged in but not authorized
    return <Navigate to="/" replace />;
  }

  return children;
}
