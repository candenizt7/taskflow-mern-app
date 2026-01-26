// ========================================
// TYPE IMPORTS
// ========================================
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

// ========================================
// PROPS INTERFACE
// ========================================
interface ProtectedRouteProps {
  children: ReactNode;
}

// ========================================
// COMPONENT
// ========================================
function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;