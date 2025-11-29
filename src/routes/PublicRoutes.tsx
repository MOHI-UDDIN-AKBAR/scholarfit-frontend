import { Route } from 'react-router';
import Home from '../pages/Home/Home';
import PublicLayout from '../components/layout/PublicLayout';
import Profile from '../pages/Profile/Profile';

const PublicRoutes: React.ReactElement = (
  <Route element={<PublicLayout />}>
    <Route index element={<Home />} />
    <Route path="profile" element={<Profile />} />
  </Route>
);

export default PublicRoutes;
