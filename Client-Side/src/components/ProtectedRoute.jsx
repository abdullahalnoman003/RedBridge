import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { firebaseUser, dbUser, loading } = useAuth();

  if (loading) return <Loader />;

  if (!firebaseUser) return <Navigate to="/login" replace />;

  if (allowedRoles && dbUser && !allowedRoles.includes(dbUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
