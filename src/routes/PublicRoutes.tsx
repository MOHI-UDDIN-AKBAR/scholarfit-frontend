import { Route } from 'react-router';
import Home from '../pages/Home/Home';
import PublicLayout from '../components/layout/PublicLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

const PublicRoutes: React.ReactElement = (
  <Route element={<PublicLayout />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>
);

export default PublicRoutes;
