import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Require specific role: "BROKER" or "BUYER" */
export default function RoleRoute({ role, children }) {
  const { auth } = useAuth();
  if (!auth?.token) return <Navigate to="/login" replace />;
  if (auth?.role !== role) return <Navigate to="/" replace />;
  return children;
}
