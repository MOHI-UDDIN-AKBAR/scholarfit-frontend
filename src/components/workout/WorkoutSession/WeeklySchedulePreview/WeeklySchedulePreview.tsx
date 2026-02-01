import { useGetDashboardStats } from '../../../../services/queries/dashboard';
import WeeklySchedule from '../../../dashboard/WeeklySchedule/WeeklySchedule';
import { LoadingSpinner } from '../../../shared/LoadingSpinner/LoadingSpinner';

const WeeklySchedulePreview: React.FC = () => {
  const { data: dashboardStats, isLoading } = useGetDashboardStats();

  if (isLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-60">
        <div className="grid h-full">
          <LoadingSpinner size="xl" variant="primary" />
        </div>
      </section>
    );
  }

  if (!dashboardStats || dashboardStats.weeklyPrograms.length === 0) {
    return null;
  }

  return (
    <div className="p-6 mb-8 glass-card rounded-2xl fade-in [animation-delay:1s]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-700 capitalize">Your Weekly Schedule</h2>
      </div>
      <WeeklySchedule weeklyPrograms={dashboardStats.weeklyPrograms} />
    </div>
  );
};

export default WeeklySchedulePreview;
