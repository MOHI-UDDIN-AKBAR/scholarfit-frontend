import type { Direction } from '../../types/user-profile';

export const getFirstChar = (text: string = '') => text.at(0);

export const removeSpace = (text: string = '') => text.split(' ').join('');

export const capitalize = (text: string = '') =>
  text
    .split(' ')
    .map((str) => `${str.at(0)?.toUpperCase()}${str.slice(1).toLowerCase()}`)
    .join(' ');

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const convertArrayToString = (arr: unknown): string | null => {
  if (!Array.isArray(arr) || !arr.every((item) => typeof item === 'string')) {
    return null;
  }

  return arr.join(' ');
};

export const formatSignedChange = (value: number, unit: string) =>
  `${value > 0 ? '+' : ''}${value}${unit}`;

export const getChangeColorByDirection = (direction: Direction) => {
  switch (direction) {
    case 'increase':
      return 'text-green-600';
    case 'decrease':
      return 'text-red-600';
    case 'no_change':
    default:
      return 'text-gray-400';
  }
};

export const getChangeIconByDirection = (direction: Direction) => {
  switch (direction) {
    case 'increase':
      return 'arrowUp';
    case 'decrease':
      return 'arrowDown';
    case 'no_change':
    default:
      return '';
  }
};

export const formatValueWithUnit = (value: number, unit: string) => `${value} ${unit}`;

export const formatDeltaFromStart = (delta: number, unit: string) =>
  `${Math.abs(delta)} ${unit} ${delta <= 0 ? 'down' : 'up'} from start`;

export const getChangeColorByDelta = (delta: number) =>
  delta <= 0 ? 'text-green-600' : 'text-red-600';
