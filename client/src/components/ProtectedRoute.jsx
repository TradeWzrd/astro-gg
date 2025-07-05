// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

/**
 * ProtectedRoute - A component that restricts access to authenticated users
 * @param {Object} props - Component props
 * @param {boolean} props.adminOnly - If true, only admins can access this route
 * @param {React.ReactNode} props.children - Child components to render when access is granted
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  // Access auth state from Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    // Show unauthorized message if trying to access admin route without admin privileges
    if (adminOnly && isAuthenticated && !isAdmin) {
      toast.error("You don't have permission to access this page");
    }
  }, [adminOnly, isAuthenticated, isAdmin]);

  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If admin-only route and user is not an admin, redirect to home
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated (and has admin access if required), render the protected components
  return children;
};

export default ProtectedRoute;
