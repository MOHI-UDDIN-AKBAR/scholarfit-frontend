import { cn } from '../../../utils/cn';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  text?: string;
  textClassName?: string;
  variant?: 'default' | 'primary' | 'white';
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-3',
  lg: 'h-12 w-12 border-4',
  xl: 'h-16 w-16 border-4',
};

const variantClasses = {
  default: 'border-gray-200 border-t-gray-600',
  primary: 'border-primary-100 border-t-primary-600',
  white: 'border-white/30 border-t-white',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  showText = false,
  text = 'Loading...',
  variant = 'default',
  textClassName = '',
}) => {
  return (
    <div className={cn('flex gap-2 items-center justify-center', className)}>
      <div
        className={cn('animate-spin rounded-full', sizeClasses[size], variantClasses[variant])}
      />
      {showText && (
        <p className={cn('text-base text-gray-600 dark:text-gray-400', textClassName)}>{text}</p>
      )}
    </div>
  );
};
