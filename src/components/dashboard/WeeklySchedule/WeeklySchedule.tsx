import type { WeeklyProgram } from '../../../types/dashboard';
import { mapWeeklyProgramsToCards } from '../../../utils/workout/dashboard-utils';

const WeeklySchedule: React.FC<{ weeklyPrograms: WeeklyProgram[] }> = ({ weeklyPrograms }) => {
  const weeklyProgramCards = mapWeeklyProgramsToCards(weeklyPrograms);

  if (weeklyProgramCards.length === 0) return null;

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 xl:text-xl">This Week</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="space-y-4">
          {weeklyProgramCards.map((programCard) => (
            <div
              key={programCard.dayLabel}
              className="flex items-center justify-between p-3 rounded-lg bg-primary-50"
            >
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full shrink-0 bg-primary-600">
                  {programCard.dayLabel}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{programCard.name}</div>
                  <div className="text-sm text-gray-500">{programCard.durationLabel}</div>
                </div>
              </div>

              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${programCard.statusBgClass} ${programCard.statusTextClass}`}
              >
                {programCard.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;
