import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import AuthSidebarContent from '../../components/sections/AuthSidebarContent/AuthSidebarContent';
import { registrationSidebarContent } from '../../config/sidebar-content';

const Register: React.FC = () => {
  return (
    <section className="grid items-center xl:grid-cols-2 xl:p-10 xl:py-6 ">
      <AuthSidebarContent sidebarContent={registrationSidebarContent} />
      <RegisterForm />
    </section>
  );
};

export default Register;
