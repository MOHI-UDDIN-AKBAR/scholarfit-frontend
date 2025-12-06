import { Link } from 'react-router';
import InputField from '../../ui/Input/InputField';
import type { RegisterFormState } from '../../../types/auth';
import { useActionState, useState } from 'react';
import { registerUser } from '../../../actions/auth-action';
import clsx from 'clsx';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import Button from '../../ui/Button/Button';

export const initialRegisterFormState: RegisterFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: null,
};

const RegisterForm: React.FC = () => {
  const [formState, setFormState] = useState<RegisterFormState>(() => initialRegisterFormState);

  const loginAction = (prevState: unknown, formData: FormData) =>
    registerUser(prevState, formData, setFormState);
  const [state, action, isPending] = useActionState(loginAction, null);

  const handleChange = (name: keyof RegisterFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };
  console.log(state);
  return (
    <form className="grid gap-4 text-gray-700" action={action}>
      <InputField
        name="fullName"
        label="Full Name"
        type="text"
        value={formState.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        required={true}
        error={!state?.fullName?.isValid ? state?.fullName?.error : null}
        containerClassName="grid shrink"
        labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
        inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <InputField
        name="email"
        label="Email"
        type="email"
        required={true}
        value={formState.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={!state?.email?.isValid ? state?.email?.error : null}
        containerClassName="grid shrink"
        labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
        inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        required={true}
        value={formState.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={!state?.password?.isValid ? state?.password?.error : null}
        containerClassName="grid shrink"
        labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
        inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <InputField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        required={true}
        value={formState.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        error={!state?.confirmPassword?.isValid ? state?.confirmPassword?.error : null}
        containerClassName="grid shrink"
        labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
        inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />

      <div className="flex pl-2 shrink">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          className="w-5 h-5 bg-white border-gray-300 border-none checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-0 hover:cursor-pointer"
          required
        />
        <label htmlFor="acceptTerms" className="w-full ml-2 text-sm text-gray-700 ">
          I agree to the
          <span className="mx-1 text-indigo-600">Terms of Service</span>
          and
          <span className="mx-1 text-indigo-600">Privacy Policy</span>
        </label>
      </div>

      <Button
        type="submit"
        className={clsx(
          'w-full px-4 py-3 mt-10 mb-6 font-medium text-white transition duration-200 rounded-lg bg-linear-to-br ',
          isPending ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'
        )}
      >
        {isPending ? (
          <LoadingSpinner
            text="Creating Account ..."
            showText={true}
            variant="white"
            size="sm"
            textClassName="text-white!"
          />
        ) : (
          'Create Account & Start Journey'
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
