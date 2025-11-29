import { Route } from 'react-router';
import PrivateLayout from '../components/layout/PrivateLayout';
import Dashboard from '../pages/Dashboard/Dashboard';

const PrivateRoutes: React.ReactElement = (
  <Route element={<PrivateLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
);

export default PrivateRoutes;
