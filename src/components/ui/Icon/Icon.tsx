import { forwardRef, memo } from 'react';
import { IconMap, type IconName } from '.';

export interface IconProps {
  name: IconName;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  onClick?: () => void;
}

const customViewBox: Partial<Record<IconName, string>> = {
  dumbbell: '0 0 640 512',
  calculator: '0 0 640 512',
  calendar: '0 0 640 512',
  trophy: '0 0 640 512',
  chart: '0 0 640 512',
  mobile: '0 0 640 512',
  star: '0 0 640 512',
  facebook: '0 0 640 512',
  instagram: '0 0 640 512',
  tweeter: '0 0 640 512',
  linkedIn: '0 0 640 512',
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    { name, size = 6, className = '', strokeWidth = 1.5, ariaLabel, ariaHidden = true, ...props },
    ref
  ) => {
    const path = IconMap[name];
    if (!path) return null;

    const sizeClass = typeof size === 'number' ? `h-${size} w-${size}` : `h-[${size}] w-[${size}]`;

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
