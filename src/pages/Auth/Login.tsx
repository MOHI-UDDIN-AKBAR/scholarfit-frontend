import LoginForm from '../../components/auth/LoginForm/LoginForm';
import { loginSidebarContent } from '../../config/sidebar-content';
import AuthSidebarContent from '../../components/sections/AuthSidebarContent/AuthSidebarContent';

const Login: React.FC = () => {
  return (
    <section className="grid items-center xl:grid-cols-2 xl:p-10 xl:py-6">
      <AuthSidebarContent sidebarContent={loginSidebarContent} />
      <LoginForm />
    </section>
  );
};

export default Login;
