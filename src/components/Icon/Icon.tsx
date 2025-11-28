// src/components/Icon.tsx
import { forwardRef, memo } from 'react';
import { IconMap, type IconName } from '../../assets/Icons';

export interface IconProps {
  name: IconName;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

// Custom viewBox for specific icons that need different dimensions
const customViewBox: Partial<Record<IconName, string>> = {
  dumbbell: '0 0 640 512',
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { name, size = 6, className = '', strokeWidth = 1.5, ariaLabel, ariaHidden = true, ...props },
    ref
  ) => {
    const path = IconMap[name];
    if (!path) return null;

    // Handle size - use Tailwind classes for numbers, direct values for strings
    const sizeClass = typeof size === 'number' ? `h-${size} w-${size}` : `h-[${size}] w-[${size}]`;

    // Use custom viewBox if specified, otherwise default
    const viewBox = customViewBox[name] || '0 0 24 24';

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox={viewBox}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className={`${sizeClass} ${className}`}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        role={ariaLabel ? 'img' : undefined}
        {...props}
      >
        {path}
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export default memo(Icon);
