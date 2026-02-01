import { useGetUserStreak } from '../../../../services/queries/session';
import { useGetUserWorkoutList } from '../../../../services/queries/workout';
import { useAppState } from '../../../../store/hooks';
import {
  getNextUpcomingProgram,
  getRelativeDayLabel,
} from '../../../../utils/workout/schedule-utils';
import { LoadingSpinner } from '../../../shared/LoadingSpinner/LoadingSpinner';
import Icon from '../../../ui/Icon/Icon';

const RestDayHeroSection: React.FC = () => {
  const userId = useAppState((state) => state.auth.userInfo!.id);
  const { data: userStreak, isLoading: isUserStreakLoading } = useGetUserStreak();
  const { data: userWorkouts, isLoading: isUserWorkoutListLoading } = useGetUserWorkoutList(userId);

  if (isUserStreakLoading || isUserWorkoutListLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-60">
        <div className="grid h-full">
          <LoadingSpinner size="xl" variant="primary" />
        </div>
      </section>
    );
  }

  const upcomingProgram = userWorkouts ? getNextUpcomingProgram(userWorkouts) : undefined;
  const upcomingProgramPeriod = upcomingProgram
    ? getRelativeDayLabel(upcomingProgram.program.dayNumber)
    : undefined;
  return (
    <div className="mb-12 text-center fade-in col-span-full mt-18 max-xl:mt-16 ">
      <div className="inline-block mb-6 float-animation">
        <div className="flex items-center justify-center w-32 h-32 rounded-full bg-linear-to-br from-primary-500/20 to-indigo-500/20">
          <Icon name="cloud" size={20} className="text-primary-400 "></Icon>
        </div>
      </div>
      <h1 className="mb-4 text-4xl font-bold text-gray-700 md:text-5xl">Today is a Rest Day</h1>
      <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-500">
        Your body needs time to recover and rebuild. Enjoy the break—you've earned it! 🎉
      </p>

      <div className="inline-flex items-center px-6 py-3 space-x-4 rounded-full bg-primary-100">
        {userStreak && (
          <div className="flex items-center">
            <Icon name="fire" className="mr-2 text-orange-500"></Icon>
            <span className="text-sm">
              Current Streak:{' '}
              <strong className="text-primary-500">{userStreak.currentStreak} days</strong>
            </span>
          </div>
        )}
        {upcomingProgramPeriod && (
          <>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="flex items-center">
              <Icon name="couch" className="mr-2 text-indigo-500 "></Icon>
              <span className="text-sm">
                Next Workout: <strong className="text-primary-500">{upcomingProgramPeriod}</strong>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RestDayHeroSection;
