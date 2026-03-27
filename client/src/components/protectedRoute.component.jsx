/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UserDataContext from '../context/userContext';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, userData } = useContext(UserDataContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userData?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;