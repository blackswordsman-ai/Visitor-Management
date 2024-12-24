// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is accessing the correct role-based route
  const path = location.pathname;
  if (user.role === "admin" && !path.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }
  if (user.role === "receptionist" && !path.startsWith("/receptionist")) {
    return <Navigate to="/receptionist" replace />;
  }

  return children;
};

export default ProtectedRoute;
