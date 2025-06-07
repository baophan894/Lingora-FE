import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  allowedRoles?: string[];
  userRole?: string;
}

const ProtectedRoute = ({
  children,
  isAuthenticated,
  allowedRoles,
  userRole
}: ProtectedRouteProps) => {
  const location = useLocation();

  // Kiểm tra authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra role-based access
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;