import { Outlet, Navigate } from 'react-router';
import { useAppState } from '../../store/hooks';

const PrivateLayout: React.FC = () => {
  const isAuthenticated = useAppState((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateLayout;
