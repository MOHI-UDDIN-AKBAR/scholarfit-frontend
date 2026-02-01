import { forwardRef, memo, useMemo } from 'react';
import { IconMap, type IconName } from '.';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
  onClick?: () => void;
}

const CUSTOM_VIEWBOX: Partial<Record<IconName, string>> = {
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
  fire: '0 0 640 512',
  google: '0 0 640 640',
  quoteLeft: '0 0 640 512',
  brain: '0 0 640 512',
  userCheck: '0 0 640 512',
  medal: '0 0 640 512',
  weight: '0 0 640 640',
  handFist: '0 0 640 640',
  heartPulse: '0 0 640 640',
  personRunning: '0 0 640 640',
  arrowRight: '0 0 640 640',
  arrowLeft: '0 0 640 640',
  seedling: '0 0 640 640',
  leaf: '0 0 640 640',
  user: '0 0 640 640',
  weightHanging: '0 0 640 640',
  ring: '0 0 640 640',
  building: '0 0 640 640',
  gripLines: '0 0 640 640',
  couch: '0 0 640 640',
  layerGroup: '0 0 640 640',
  check: '0 0 640 640',
  search: '0 0 640 640',
  bolt: '0 0 640 640',
  childReaching: '0 0 640 640',
  heart: '0 0 640 640',
  plus: '0 0 640 640',
  clock: '0 0 640 640',
  delete: '0 0 640 640',
  save: '0 0 640 640',
  gripVertical: '0 0 640 640',
  walking: '0 0 640 640',
  pause: '0 0 640 640',
  flagCheckered: '0 0 640 640',
  edit: '0 0 640 640',
  minus: '0 0 640 640',
  tint: '0 0 640 640',
  crown: '0 0 640 640',
  circle: '0 0 640 640',
  hand: '0 0 640 640',
  percent: '0 0 640 640',
  ruler: '0 0 640 640',
  cloud: '0 0 640 640',
  gifts: '0 0 640 640',
};

const DEFAULT_VIEWBOX = '0 0 24 24';
const DEFAULT_SIZE = 6;
const DEFAULT_STROKE_WIDTH = 1.5;

const resolveSizeClass = (size: number | string): string => {
  if (typeof size === 'number') {
    return `h-${size} w-${size}`;
  }
  return `h-[${size}] w-[${size}]`;
};

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = DEFAULT_SIZE,
      className = '',
      strokeWidth = DEFAULT_STROKE_WIDTH,
      ariaLabel,
      ariaHidden = true,
      ...props
    },
    ref
  ) => {
    const path = IconMap[name];
    if (!path) {
      console.warn(`Icon "${name}" not found in IconMap`);
      return null;
    }

    const { sizeClass, viewBox } = useMemo(() => {
      return {
        sizeClass: resolveSizeClass(size),
        viewBox: CUSTOM_VIEWBOX[name] || DEFAULT_VIEWBOX,
      };
    }, [name, size]);

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
