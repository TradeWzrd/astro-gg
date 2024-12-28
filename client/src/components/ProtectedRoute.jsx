// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth); // Access auth state from Redux

  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children; // If authenticated, render the protected components
};

export default ProtectedRoute;
