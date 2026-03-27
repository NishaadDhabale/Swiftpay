import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert("Authentication recquired");
    return <Navigate to="/signin" />;
  }

  return children;
};
