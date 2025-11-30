import React, { forwardRef, useId, memo } from 'react';
import { removeSpace } from '../../../utils/helpers/formatUtils';

export type InputFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'> & {
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  id?: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const {
    containerClassName = '',
    labelClassName = '',
    inputClassName = '',
    label,
    name,
    id,
    required = false,
    hint,
    error,
    type = 'text',
    ...rest
  } = props;

  const randomId = typeof useId === 'function' ? useId() : undefined;
  const generatedBase = removeSpace(name ?? label ?? 'input').toLowerCase();
  const inputId =
    id ??
    (randomId
      ? `${generatedBase}-${randomId}`
      : `${generatedBase}-${Math.random().toString(36).slice(2, 9)}`);

  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={containerClassName}>
      {label ? (
        <label htmlFor={inputId} className={labelClassName}>
          {label}
          {required && (
            <span aria-hidden="true" className="text-fitness-red ml-1">
              *
            </span>
          )}
        </label>
      ) : null}

      <input
        id={inputId}
        ref={ref}
        name={name}
        type={type}
        required={required}
        className={inputClassName}
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      />

      {hint && !error ? (
        <p id={hintId} className="mt-2 text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-fitness-red">
          {error}
        </p>
      ) : null}
    </div>
  );
});

InputField.displayName = 'InputField';

export default memo(InputField);
