import { useGetDashboardStats } from '../../services/queries/dashboard';
import { useAppState } from '../../store/hooks';
import { getFormattedCurrentDate } from '../../utils/helpers/dateUtils';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner/LoadingSpinner';
import Achievements from '../../components/dashboard/Achievements/Achievements';
import MonthlyCalendar from '../../components/dashboard/MonthlyCalendar/MonthlyCalendar';
import ProgressCharts from '../../components/dashboard/ProgressCharts/ProgressCharts';
import QuickActions from '../../components/dashboard/QuickActions/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity/RecentActivity';
import StatsCards from '../../components/dashboard/StatsCards/StatsCards';
import TodaysWorkout from '../../components/dashboard/TodaysWorkout/TodaysWorkout';
import WeeklySchedule from '../../components/dashboard/WeeklySchedule/WeeklySchedule';

const Dashboard: React.FC = () => {
  const userName = useAppState((state) => state.auth.userInfo!.name);
  const today = getFormattedCurrentDate();
  const { data: dashboardStats, isLoading, isError, error } = useGetDashboardStats();

  if (isLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-60">
        <div className="grid h-full">
          <LoadingSpinner size="xl" variant="primary" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">
          {error?.message || 'Failed to load dashboard stats'}
        </div>
      </section>
    );
  }

  if (!dashboardStats) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center"> No dashboard data available </div>
      </section>
    );
  }

  return (
    <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-4 mb-6 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900 xl:text-3xl">
          Welcome back{userName && `, ${userName}`}! 👋
        </h1>
        <p className="mt-1 text-gray-600">Today is {today}</p>
      </div>
      <StatsCards
        streakInfo={dashboardStats.streakInfo}
        weeklyGoal={dashboardStats.weeklyGoal}
        bodyWeightStats={dashboardStats.bodyWeightStats}
        totalPrograms={dashboardStats.totalPrograms}
      />
      <div className="px-4 sm:px-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <TodaysWorkout scheduledProgram={dashboardStats.scheduledProgram} />
            <ProgressCharts
              volumeTrend={dashboardStats.volumeTrend}
              bodyWeightTrend={dashboardStats.bodyWeightTrend}
            />
            <RecentActivity />
          </div>
          <div className="space-y-6">
            <WeeklySchedule weeklyPrograms={dashboardStats.weeklyPrograms} />
            <Achievements />
            <QuickActions />
            <MonthlyCalendar weeklyPrograms={dashboardStats.weeklyPrograms} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
