import type { CalendarDay, WeeklyProgram } from '../../types/dashboard';
import { DAY, MONTHS_SHORT, WEEKDAY_LABELS } from '../constants/appConstants';

export const getYear = (date: Date = new Date()): number => date.getFullYear();

export const getWeekdayNameByDayNumber = (dayNumber: number): string => {
  if (dayNumber < 1 || dayNumber > 7) {
    throw new Error(`Invalid weekday number: ${dayNumber}. Expected 1–7.`);
  }

  return WEEKDAY_LABELS[dayNumber - 1];
};

export const getWeekdayNumber = (date: Date = new Date()): number => {
  const day = date.getDay();
  return day === 0 ? 7 : day;
};

export const getWeekdayName = (date: Date = new Date(), locale: string = 'en-US'): string => {
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

export const formatDate = (
  date: Date = new Date(),
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
): string => {
  return date.toLocaleDateString(locale, options);
};

export const getDateInfo = (date: Date = new Date()) => ({
  weekdayNumber: getWeekdayNumber(date),
  weekdayName: getWeekdayName(date),
  formattedDate: formatDate(date),
});

export const normalizeTime = (input: string): string => {
  if (!input || typeof input !== 'string') return '00:00';

  const clean = input.trim();

  if (clean.includes(':')) {
    const [rawMinutes = '0', rawSeconds = '0'] = clean.split(':');

    const minutes = parseInt(rawMinutes || '0', 10);
    let seconds = parseInt(rawSeconds || '0', 10);

    if (isNaN(minutes) || isNaN(seconds)) return '00:00';

    const extraMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes + extraMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(
      2,
      '0'
    )}`;
  }

  if (clean.includes('.')) {
    const [rawMinutes = '0', rawSeconds = '0'] = clean.split('.');

    const minutes = parseInt(rawMinutes || '0', 10);
    const seconds = parseInt(rawSeconds.padEnd(2, '0').slice(0, 2), 10);

    if (isNaN(minutes) || isNaN(seconds)) return '00:00';

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const minutes = parseInt(clean, 10);
  if (!isNaN(minutes)) {
    return `${String(minutes).padStart(2, '0')}:00`;
  }

  return '00:00';
};

export const minutesToSeconds = (minutes: number): number => {
  return minutes * 60;
};

export const secondsToMinutes = (seconds: number) => seconds / 60;

export const formatSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export function formatTo12HourTime(isoString: string): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date string passed to formatTo12HourTime');
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${paddedHours}:${paddedMinutes} ${ampm}`;
}

export const getFormattedCurrentDate = (data = new Date(), locale: string = 'en-US'): string => {
  return data.toLocaleDateString(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const buildMonthlyCalendar = (
  monthDate: Date,
  weeklyPrograms: WeeklyProgram[]
): CalendarDay[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeekday = getWeekdayNumber(firstDay);
  const totalDays = lastDay.getDate();

  const calendar: CalendarDay[] = [];

  for (let i = startWeekday - 1; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    calendar.push({
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: false,
      status: 'outside',
    });
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    const weekday = getWeekdayNumber(date);

    const program = weeklyPrograms.find((wp) => wp.dayNumber === weekday);

    calendar.push({
      date,
      dayNumber: day,
      isCurrentMonth: true,
      program,
      status: program?.schedulePeriod ?? 'default',
    });
  }

  return calendar;
};

export const getShortMonthName = (dateInput: Date | string): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return MONTHS_SHORT[date.getMonth()] ?? '';
};

export const formatRelativeDate = (input: string | Date, now: Date = new Date()): string => {
  const date = typeof input === 'string' ? new Date(input) : input;

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffMs = startOfToday.getTime() - startOfDate.getTime();
  const diffDays = Math.floor(diffMs / DAY);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }

  const months = Math.floor(diffDays / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
};
