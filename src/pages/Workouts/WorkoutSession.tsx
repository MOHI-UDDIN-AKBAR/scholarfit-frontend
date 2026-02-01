import { Link, useParams } from 'react-router';
import CurrentExerciseCard from '../../components/workout/WorkoutSession/CurrentExerciseCard/CurrentExerciseCard';
import Header from '../../components/workout/WorkoutSession/Header/Header';
import QuickActions from '../../components/workout/WorkoutSession/QuickActions/QuickActions';
import SessionStats from '../../components/workout/WorkoutSession/SessionStats/SessionStats';
import { useAppDispatch, useAppState } from '../../store/hooks';
import { useEffect, useMemo } from 'react';
import RestDayHeroSection from '../../components/workout/WorkoutSession/RestDayHeroSection/RestDayHeroSection';
import WeeklySchedulePreview from '../../components/workout/WorkoutSession/WeeklySchedulePreview/WeeklySchedulePreview';
import { setActiveWorkoutSession } from '../../store/slices/workout-slices/workoutSessionSlice';
import { shallowEqual } from 'react-redux';
import WorkoutCompletionHeroSection from '../../components/workout/WorkoutSession/WorkoutCompletionHeroSection/WorkoutCompletionHeroSection';
import UpcomingExercises from '../../components/workout/WorkoutSession/UpcomingExercises/UpcomingExercises';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner/LoadingSpinner';
import { useGetUserWorkoutList } from '../../services/queries/workout';
import Icon from '../../components/ui/Icon/Icon';
import EmptyState from '../../components/shared/EmptyState/EmptyState';
import { useCreateSessionHistory } from '../../services/mutations/session';
import { getProgramScheduledForToday } from '../../utils/workout/program-utils';
import { getWorkout } from '../../utils/workout/workout-utils';

const WorkoutSession: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const dispatch = useAppDispatch();

  const { userId, isTodaysProgramComplete } = useAppState(
    (state) => ({
      userId: state.auth.userInfo!.id,
      isTodaysProgramComplete: state.workoutSession.isTodaysProgramComplete,
    }),
    shallowEqual
  );

  const { data: userWorkouts, isLoading, isError, error } = useGetUserWorkoutList(userId);

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
          {error?.message || 'Failed to load workouts'}
        </div>
      </section>
    );
  }

  if (!userWorkouts || userWorkouts.length === 0) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <EmptyState
          title="No workouts yet"
          wrapperClassName="max-w-md space-y-3"
          description="You haven not created or added any workouts yet. Start by creating or adding your first workout."
          action={
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Link
                to="/workouts/create-workout"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                <Icon name="arrowLeft" className="mr-2" />
                back to workout
              </Link>
            </div>
          }
        />
      </section>
    );
  }

  if (!workoutId) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-center">
        <div className="px-4">
          <p className="text-lg font-semibold text-gray-600">Invalid workout session</p>
          <p className="text-sm text-gray-500">No workout ID provided</p>
        </div>
      </div>
    );
  }

  const currentSessionWorkout = useMemo(() => {
    return getWorkout(userWorkouts, workoutId);
  }, [userWorkouts, workoutId]);

  if (!currentSessionWorkout) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-center">
        <div className="px-4">
          <p className="text-lg font-semibold text-gray-600">Workout not found</p>
          <p className="text-sm text-gray-500">The requested workout session could not be found</p>
        </div>
      </div>
    );
  }

  const programScheduledToday = getProgramScheduledForToday(currentSessionWorkout.programs);

  useEffect(() => {
    if (!programScheduledToday || !currentSessionWorkout) return;
    dispatch(
      setActiveWorkoutSession({
        sessionWorkout: currentSessionWorkout,
        sessionWorkoutProgram: programScheduledToday,
        currentProgramExercise: {
          workoutExercise: programScheduledToday.exercises[0],
          exerciseNumber: 1,
          currentSet: 1,
        },
      })
    );
  }, []);

  const { sessionWorkoutProgram, workoutHistory } = useAppState(
    (state) => ({
      sessionWorkoutProgram: state.workoutSession.sessionWorkoutProgram,
      workoutHistory: state.workoutSession.workoutHistory,
    }),
    shallowEqual
  );

  const { mutate: sessionHistoryMutation } = useCreateSessionHistory();

  useEffect(() => {
    if (!sessionWorkoutProgram || !isTodaysProgramComplete || !workoutHistory) return;
    sessionHistoryMutation({ sessionPayload: workoutHistory });
  }, [sessionWorkoutProgram, isTodaysProgramComplete, workoutHistory]);

  if (isTodaysProgramComplete || !programScheduledToday) {
    let ScreenComponent: React.ReactNode = null;
    if (isTodaysProgramComplete && programScheduledToday) {
      ScreenComponent = (
        <WorkoutCompletionHeroSection
          showConfetti
          confettiEffect="realistic"
          confettiOptions={{
            colors: ['#ff0000', '#00ff00', '#0000ff'],
            duration: 1000,
          }}
          programDuration={programScheduledToday.duration}
          totalProgramExercises={programScheduledToday.exercises.length}
        />
      );
    } else if (!programScheduledToday) {
      ScreenComponent = <RestDayHeroSection />;
    }
    return (
      <section className="relative">
        {ScreenComponent}
        <WeeklySchedulePreview />
      </section>
    );
  }

  return (
    <section className="relative">
      <Header
        programName={programScheduledToday.name}
        programDuration={programScheduledToday.duration}
        totalProgramExercises={programScheduledToday.exercises.length}
      />

      <section className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CurrentExerciseCard todayProgram={programScheduledToday} />
          </div>

          <div className="space-y-6 lg:col-span-1">
            <SessionStats totalProgramExercises={programScheduledToday.exercises.length} />
            <QuickActions />

            <UpcomingExercises upcomingExercises={programScheduledToday.exercises} />
          </div>
        </div>
      </section>
      <WeeklySchedulePreview />
    </section>
  );
};

export default WorkoutSession;
