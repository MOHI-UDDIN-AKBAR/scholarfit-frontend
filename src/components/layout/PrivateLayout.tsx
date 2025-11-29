import { Outlet, Navigate } from 'react-router';

const PrivateLayout: React.FC = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateLayout;
