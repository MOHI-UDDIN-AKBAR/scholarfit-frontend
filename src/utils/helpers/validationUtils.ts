import { BODY_MEASUREMENT_LIMITS } from '../../actions/progress-action';
import type { HeightUnit, WeightUnit } from '../../config/onboarding-content';
import type { ValidationResult } from '../types';

export const validateFullName = (
  fullName: string,
  options?: { minLength?: number; allowNumbers?: boolean }
): ValidationResult => {
  const trimmed = fullName.trim();
  const minLength = options?.minLength ?? 2;
  const allowNumbers = options?.allowNumbers ?? false;

  if (!trimmed) {
    return { isValid: false, error: 'name is required' };
  }

  if (trimmed.length < minLength) {
    return {
      isValid: false,
      error: `name must be at least ${minLength} characters long`,
    };
  }

  const nameRegex = allowNumbers ? /^[a-zA-Z0-9\s]+$/ : /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'name contains invalid characters' };
  }

  return { isValid: true, error: null };
};

export const validateEmail = (email: string): ValidationResult => {
  const trimmed = email.trim();

  if (!trimmed) {
    return { error: 'Email is required', isValid: false };
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { isValid: false, error: 'Email is invalid' };
    }
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validatePassword = (
  password: string,
  options?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecialChar?: boolean;
  }
): ValidationResult => {
  const trimmed = password.trim();

  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = true,
  } = options || {};

  if (trimmed.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters long`,
    };
  }
  if (requireUppercase && !/[A-Z]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }
  if (requireLowercase && !/[a-z]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }
  if (requireNumber && !/[0-9]/.test(trimmed)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Password must contain at least one special character',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword.trim()) {
    return { isValid: false, error: 'Confirm password is required' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }

  return { isValid: true, error: null };
};

export const validateAge = (age: number | undefined): ValidationResult => {
  if (age === undefined || isNaN(age)) {
    return { isValid: false, error: 'Age is required' };
  }
  if (age < 13) {
    return { isValid: false, error: 'You must be at least 13 to use this app' };
  }
  if (age > 120) {
    return { isValid: false, error: 'Please enter a valid age' };
  }
  return { isValid: true, error: null };
};

export const validateHeight = (height: {
  value: number | undefined;
  unit: HeightUnit;
}): ValidationResult => {
  if (!height.value) {
    return { isValid: false, error: 'Height is required' };
  }

  if (height.unit === 'cm') {
    if (height.value < 80 || height.value > 250) {
      return { isValid: false, error: 'Enter a valid height in cm' };
    }
  }

  if (height.unit === 'ft') {
    if (height.value < 2.5 || height.value > 8) {
      return { isValid: false, error: 'Enter a valid height in feet' };
    }
  }

  return { isValid: true, error: null };
};

export const validateWeight = (weight: {
  value: number | undefined;
  unit: WeightUnit;
}): ValidationResult => {
  if (!weight.value) {
    return { isValid: false, error: 'Weight is required' };
  }

  if (weight.unit === 'kg') {
    if (weight.value < 20 || weight.value > 350) {
      return { isValid: false, error: 'Enter a valid weight in kg' };
    }
  }

  if (weight.unit === 'lbs') {
    if (weight.value < 40 || weight.value > 700) {
      return { isValid: false, error: 'Enter a valid weight in lbs' };
    }
  }

  return { isValid: true, error: null };
};

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (typeof value === 'object') {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      return Object.keys(value).length === 0;
    }
    return false;
  }

  return false;
};

export const isEmptyTyped = {
  string: (value: string): boolean => value.trim().length === 0,

  array: <T>(value: T[]): boolean => value.length === 0,

  object: (value: Record<string, unknown>): boolean => Object.keys(value).length === 0,

  map: <K, V>(value: Map<K, V>): boolean => value.size === 0,

  set: <T>(value: Set<T>): boolean => value.size === 0,

  any: (value: unknown): boolean => isEmpty(value),
};

const isPrimitiveEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return false; // Valid primitives
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return false;
  }

  // Exclude special object types
  if (
    value instanceof Date ||
    value instanceof RegExp ||
    value instanceof Map ||
    value instanceof Set ||
    value instanceof WeakMap ||
    value instanceof WeakSet ||
    value instanceof Error ||
    value instanceof Promise
  ) {
    return false;
  }

  return Object.prototype.toString.call(value) === '[object Object]';
};

export const hasAllValues = (
  obj: unknown,
  options: {
    ignoreFields?: string[];
    maxDepth?: number;
    treatEmptyArrayAsEmpty?: boolean;
  } = {}
): boolean => {
  const { ignoreFields = [], maxDepth = Infinity, treatEmptyArrayAsEmpty = true } = options;

  const validate = (value: unknown, currentDepth: number): boolean => {
    if (currentDepth > maxDepth) {
      return true;
    }

    if (!isPlainObject(value) && !Array.isArray(value)) {
      return !isPrimitiveEmpty(value);
    }

    if (Array.isArray(value)) {
      if (treatEmptyArrayAsEmpty && value.length === 0) {
        return false;
      }

      return value.every((item) => validate(item, currentDepth + 1));
    }

    if (isPlainObject(value)) {
      const keys = Object.keys(value);

      if (keys.length === 0) {
        return false;
      }

      return keys.every((key) => {
        if (ignoreFields.includes(key)) {
          return true;
        }

        return validate(value[key], currentDepth + 1);
      });
    }

    return false;
  };

  return validate(obj, 0);
};

export const getValidationReport = (
  obj: unknown,
  options: {
    ignoreFields?: string[];
    maxDepth?: number;
  } = {}
) => {
  const { ignoreFields = [], maxDepth = Infinity } = options;

  const emptyFields: string[] = [];
  const report: Array<{
    path: string;
    value: unknown;
    isEmpty: boolean;
    type: string;
  }> = [];

  const validate = (value: unknown, currentDepth: number, basePath: string = ''): void => {
    if (currentDepth > maxDepth) {
      return;
    }

    if (!isPlainObject(value) && !Array.isArray(value)) {
      const isEmpty = isPrimitiveEmpty(value);
      const path = basePath || 'root';

      if (isEmpty && !ignoreFields.includes(path)) {
        emptyFields.push(path);
      }

      report.push({
        path,
        value,
        isEmpty,
        type: typeof value,
      });

      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 0 && !ignoreFields.includes(basePath)) {
        emptyFields.push(basePath);
      }

      value.forEach((item, index) => {
        const path = basePath ? `${basePath}[${index}]` : `[${index}]`;
        validate(item, currentDepth + 1, path);
      });

      return;
    }

    if (isPlainObject(value)) {
      Object.keys(value).forEach((key) => {
        if (ignoreFields.includes(key)) {
          return;
        }

        const path = basePath ? `${basePath}.${key}` : key;
        validate(value[key], currentDepth + 1, path);
      });
    }
  };

  validate(obj, 0);

  return {
    isValid: emptyFields.length === 0,
    emptyFields,
    report,
  };
};

export const isObjectComplete = (
  obj: unknown,
  options?: Parameters<typeof hasAllValues>[1]
): boolean => {
  return hasAllValues(obj, options);
};

export const hasEmptyValues = (
  obj: unknown,
  options?: Parameters<typeof hasAllValues>[1]
): boolean => {
  return !hasAllValues(obj, options);
};

const valid: ValidationResult = { isValid: true, error: null };

const invalid = (message: string): ValidationResult => ({
  isValid: false,
  error: message,
});

export const validateNumberInRange = (
  rawValue: unknown,
  min: number,
  max: number,
  label: string
): ValidationResult => {
  const value = Number(rawValue);

  if (isNaN(value)) return invalid(`${label} must be a number`);
  if (value < min || value > max) {
    return invalid(`${label} must be between ${min} and ${max}`);
  }

  return valid;
};

export const validateReps = (value: string): ValidationResult => {
  const trimmed = value.trim();
  if (!trimmed) return invalid('Reps is required');

  const rangePattern = /^(\d{1,2})(-(\d{1,2}))?$/;
  const match = trimmed.match(rangePattern);

  if (!match) {
    return invalid('Reps must be a number or range (e.g., 10 or 8-12)');
  }

  const start = Number(match[1]);
  const end = match[3] ? Number(match[3]) : null;

  if (end === null) {
    if (start < 6 || start > 16) {
      return invalid('Reps must be between 6 and 16');
    }
    return valid;
  }

  if (start < 6 || start > 16 || end < 6 || end > 16) {
    return invalid('Reps range values must be between 6 and 16');
  }

  if (start >= end) {
    return invalid('Reps range must be in ascending order (e.g., 8-12)');
  }

  return valid;
};

export const validateNotes = (value: string): ValidationResult => {
  if (value.length > 350) {
    return invalid('Notes must be 350 characters or less');
  }
  return valid;
};

export const validateSets = (value: unknown): ValidationResult =>
  validateNumberInRange(value, 1, 10, 'Sets');

export const validateRest = (value: unknown): ValidationResult =>
  validateNumberInRange(value, 0, 300, 'Rest time');

type MeasurementKey = keyof typeof BODY_MEASUREMENT_LIMITS;

export const validateMeasurement = (key: MeasurementKey, value: number): string | null => {
  const { min, max } = BODY_MEASUREMENT_LIMITS[key];

  if (value < min || value > max) {
    return `Must be between ${min} and ${max}`;
  }

  return null;
};
