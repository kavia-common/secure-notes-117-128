import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

/**
 * Protect child routes/components, redirect to login if not authenticated.
 */
// PUBLIC_INTERFACE
export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
