import InputField from '../../ui/Input/InputField';
import { useActionState, useState } from 'react';
import { loginUser } from '../../../actions/auth-action';
import type { LoginFormState } from '../../../types/auth';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import Button from '../../ui/Button/Button';
import clsx from 'clsx';

export const initialLoginFormState: LoginFormState = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>(() => initialLoginFormState);

  const loginAction = (prevState: unknown, formData: FormData) =>
    loginUser(prevState, formData, setFormState);
  const [state, action, isPending] = useActionState(loginAction, null);

  const handleChange = (name: keyof LoginFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="grid gap-4 text-gray-700" action={action}>
      <InputField
        name="email"
        label="Email"
        type="email"
        value={formState.email}
        onChange={(e) => handleChange('email', e.target.value)}
        required={true}
        error={!state?.email?.isValid ? state?.email?.error : null}
        containerClassName="grid shrink"
        labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
        inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <InputField
        name="password"
        label="Password"
        type="password"
        value={formState.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={!state?.password?.isValid ? state?.password?.error : null}
        required={true}
        containerClassName="grid shrink"
        labelClassName="block font-bold text-gray-700  pb-0.5 pl-2"
        inputClassName="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <Button
        disabled={isPending}
        type="submit"
        className={clsx(
          'w-full px-4 py-3 mt-6 mb-6 font-medium text-white transition duration-200 rounded-lg bg-linear-to-br ',
          isPending ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'
        )}
      >
        {isPending ? (
          <LoadingSpinner
            text="Logging in..."
            showText={true}
            variant="white"
            size="sm"
            textClassName="text-white!"
          />
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
