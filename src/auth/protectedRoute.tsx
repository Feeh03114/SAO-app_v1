import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/auth";

export const ProtectedRoute = ({ children }:{ children: any}):JSX.Element => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};