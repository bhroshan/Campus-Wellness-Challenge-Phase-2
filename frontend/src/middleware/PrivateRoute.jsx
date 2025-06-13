import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return null; // or a loading spinner
  }

  // If not authenticated, redirect to login and save current location
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 