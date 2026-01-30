import { Route } from 'react-router';
import PrivateLayout from '../components/layout/PrivateLayout';
import ExerciseDetails from '../pages/Exercises/ExerciseDetail';
import ExerciseLibrary from '../pages/Exercises/ExerciseLibrary';
import CreateWorkout from '../pages/Workouts/CreateWorkout';
import Profile from '../pages/Profile/Profile';
import Dashboard from '../pages/Dashboard/Dashboard';
import Progress from '../pages/Progress/Progress';
import Workout from '../pages/Workouts/Workout';
import WorkoutDetails from '../pages/Workouts/WorkoutDetails';
import WorkoutSession from '../pages/Workouts/WorkoutSession';
import Onboarding from '../pages/Onboarding/Onboarding';

const PrivateRoutes: React.ReactElement = (
  <Route element={<PrivateLayout />}>
    <Route path="profile" element={<Profile />} />
    <Route path="Onboarding" element={<Onboarding />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="progress" element={<Progress />} />
    <Route path="exercises" element={<ExerciseLibrary />} />
    <Route path="exercises/:exerciseId" element={<ExerciseDetails />} />
    <Route path="workouts" element={<Workout />} />
    <Route path="workouts/:workoutId" element={<WorkoutDetails />} />
    <Route path="workouts/create-workout" element={<CreateWorkout />} />
    <Route path="workouts/:workoutId/session" element={<WorkoutSession />} />
  </Route>
);

export default PrivateRoutes;
