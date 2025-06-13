import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return null; // or a loading spinner
  }

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // If authenticated, redirect to previous page or dashboard
  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;