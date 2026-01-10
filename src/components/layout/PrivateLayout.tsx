import { Outlet, Navigate } from 'react-router';
import { useAppState } from '../../store/hooks';

const PrivateLayout: React.FC = () => {
  const isAuthenticated = useAppState((state) => Boolean(state.auth.accessToken));

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateLayout;
