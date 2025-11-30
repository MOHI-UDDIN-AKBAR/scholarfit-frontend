import { Link } from 'react-router';
import Icon from '../../ui/Icon/Icon';
import InputField from '../../ui/Input/InputField';

const LoginForm: React.FC = () => {
  return (
    <section className="grid p-4 md:p-12 max-md:mt-10">
      <h1 className="py-4 text-3xl font-bold text-center text-gray-600 ">Sign into your account</h1>
      <div className="grid gap-2 py-6 ">
        <button
          type="button"
          className="flex items-center justify-center gap-2 font-bold text-center border-2 rounded-md border-primary-900 hover:cursor-pointer "
        >
          <Icon name="google" className="w-8 h-10 text-indigo-800" />
          <span className="text-lg text-gray-700">Sign in with Google</span>
        </button>
        <p className="my-4 text-center text-gray-600 capitalize">Or</p>
        <div className="grid items-center gap-6 shrink">
          <form className="grid gap-4 text-gray-700">
            <InputField
              name="email"
              label="Email"
              type="email"
              required={true}
              containerClassName="grid shrink"
              labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
              inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              required={true}
              containerClassName="grid shrink"
              labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
              inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full px-4 py-3 mt-6 mb-6 font-medium text-white transition duration-200 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600"
            >
              Login
            </button>
          </form>
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
  );
};

export default LoginForm;
