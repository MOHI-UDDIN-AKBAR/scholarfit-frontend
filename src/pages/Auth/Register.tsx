import { Link } from 'react-router';
import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import AuthSidebarContent from '../../components/sections/AuthSidebarContent/AuthSidebarContent';
import { REGISTRATION_SIDEBAR_CONTENT } from '../../config/sidebar-content';

const Register: React.FC = () => {
  return (
    <section className="grid items-center xl:grid-cols-2 xl:p-10 xl:py-6 ">
      <AuthSidebarContent sidebarContent={REGISTRATION_SIDEBAR_CONTENT} />

      <section className="grid p-4 md:p-12 max-md:mt-10">
        <h1 className="py-4 text-3xl font-bold text-center text-gray-600 ">Get Started</h1>
        <p className="mt-2 text-base text-center text-gray-600">
          Create your account to begin your fitness transformation
        </p>
        <div className="grid gap-2 py-14 ">
          <div className="grid items-center gap-6 shrink">
            <RegisterForm />
            <section className="flex items-center gap-4 pb-4 justify-self-center">
              <p className="text-gray-600">Already have an account?</p>
              <Link
                to="/login"
                className="px-2 py-1 mx-auto font-bold text-gray-700 border-2 rounded-md hover:text-primary-600 hover:cursor-pointer max-lg:py-1 border-primary-700"
              >
                Sign in
              </Link>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Register;
