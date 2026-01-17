import LoginForm from '../../components/auth/LoginForm/LoginForm';
import { LOGIN_SIDEBAR_CONTENT } from '../../config/sidebar-content';
import AuthSidebarContent from '../../components/sections/AuthSidebarContent/AuthSidebarContent';
import { Link } from 'react-router';

const Login: React.FC = () => {
  return (
    <section className="grid items-center xl:grid-cols-2 xl:p-10 xl:py-6">
      <AuthSidebarContent sidebarContent={LOGIN_SIDEBAR_CONTENT} />
      <section className="grid p-4 md:p-12 max-md:mt-10">
        <h1 className="py-4 text-3xl font-bold text-center text-gray-600 ">
          Sign into your account
        </h1>
        <div className="grid gap-2 py-6 ">
          <div className="grid items-center gap-6 shrink">
            <LoginForm />
            <section className="flex items-center gap-4 pb-4 justify-self-center">
              <p className="text-gray-600">Don't have an account?</p>
              <Link
                to="/Register"
                className="px-2 py-1 mx-auto font-bold text-gray-700 border-2 rounded-md hover:text-primary-600 hover:cursor-pointer max-lg:py-1 border-primary-700"
              >
                Sign up
              </Link>
            </section>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
