import { Link } from 'react-router';
import InputField from '../../ui/Input/InputField';

const RegisterForm: React.FC = () => {
  return (
    <section className="grid p-4 md:p-12 max-md:mt-10">
      <h1 className="py-4 text-3xl font-bold text-center text-gray-600 ">Get Started</h1>
      <p className="mt-2 text-base text-center text-gray-600">
        Create your account to begin your fitness transformation
      </p>
      <div className="grid gap-2 py-14 ">
        <div className="grid items-center gap-6 shrink">
          <form className="grid gap-4 text-gray-700">
            <InputField
              name="fullname"
              label="Full Name"
              type="text"
              required={true}
              containerClassName="grid shrink"
              labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
              inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
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
            <InputField
              name="confirm-password"
              label="Confirm Password"
              type="confirm-password"
              required={true}
              containerClassName="grid shrink"
              labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
              inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            <div className="flex pl-2 shrink">
              <input
                type="checkbox"
                id="acceptTerms"
                className="w-5 h-5 bg-white border-gray-300 border-none checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-0"
                required
              />
              <label htmlFor="acceptTerms" className="w-full ml-2 text-sm text-gray-700 ">
                I agree to the
                <a href="#" className="mx-1 text-indigo-600 hover:text-indigo-800">
                  Terms of Service
                </a>
                and
                <a href="#" className="mx-1 text-indigo-600 hover:text-indigo-800">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 mt-10 mb-6 font-medium text-white transition duration-200 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600"
            >
              Create Account & Start Journey
            </button>
          </form>
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
  );
};

export default RegisterForm;
