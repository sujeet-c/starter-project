import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function RequireRole({ role, children }) {
  const { isAuthenticated, user } = useAuth();


  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const userRole = user && user.role ? String(user.role).toLowerCase() : null;
  const requiredRole = role ? String(role).toLowerCase() : null;

  let resolvedRole = userRole;
  if (!resolvedRole && user) {
    const alt = user.user_role || user.role_id || user.userrole || user.roleName || user.rolename;
    if (alt !== undefined && alt !== null) resolvedRole = String(alt).toLowerCase();
  }

  console.debug('RequireRole: resolvedRole=', resolvedRole, 'required=', requiredRole, 'user=', user);

  if (!user || resolvedRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
