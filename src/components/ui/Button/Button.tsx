import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  className = 'inline-flex items-center px-3 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none',
  ...props
}) => {
  return (
    <button {...props} className={clsx(className)} type={type}>
      {children}
    </button>
  );
};

export default Button;
