import { useMemo, useState } from 'react';
import type { WeeklyProgram } from '../../../types/dashboard';
import { buildMonthlyCalendar } from '../../../utils/helpers/dateUtils';
import { CALENDAR_DAY_STYLES } from '../../../utils/constants/appConstants';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

type HeaderProps = {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
};

const Header: React.FC<HeaderProps> = ({ month, onPrev, onNext }) => (
  <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 sm:px-6">
    <h3 className="text-lg font-medium text-gray-900">
      {month.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}
    </h3>
    <div className="flex items-center space-x-2">
      <button onClick={onPrev} className="p-1 text-2xl rounded hover:bg-gray-100">
        ‹
      </button>
      <button onClick={onNext} className="p-1 text-2xl rounded hover:bg-gray-100">
        ›
      </button>
    </div>
  </div>
);

type MonthlyCalendarProps = {
  weeklyPrograms: WeeklyProgram[];
};

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ weeklyPrograms }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(
    () => buildMonthlyCalendar(currentMonth, weeklyPrograms),
    [currentMonth, weeklyPrograms]
  );

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <Header
        month={currentMonth}
        onPrev={() => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
        onNext={() => setCurrentMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
      />

      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-7 mb-2 text-xs font-medium text-center text-gray-500">
          {WEEKDAYS.map((d, index) => (
            <div key={`${d}-${index}`}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`flex items-center justify-center h-8 ${CALENDAR_DAY_STYLES[day.status]}`}
              title={day.program?.name}
            >
              {day.dayNumber}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
