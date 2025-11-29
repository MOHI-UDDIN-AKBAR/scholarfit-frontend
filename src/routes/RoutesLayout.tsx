import { Route, Routes } from 'react-router';
import PublicRoutes from './PublicRoutes';
import Layout from '../components/layout/Layout';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoutes from './PrivateRoutes';

const RoutesLayout: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {PublicRoutes}
        {PrivateRoutes}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RoutesLayout;
