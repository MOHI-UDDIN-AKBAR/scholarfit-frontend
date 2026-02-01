import { useGetProfileData } from '../../services/queries/user-profile';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner/LoadingSpinner';
import BodyMeasurements from '../../components/ProfileContainer/BodyMeasurements/BodyMeasurements';
import Header from '../../components/ProfileContainer/Header/Header';
import RecentAchievements from '../../components/ProfileContainer/RecentAchievements/RecentAchievements';

const Profile: React.FC = () => {
  const { data, isLoading, isError, error } = useGetProfileData();

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
          {error?.message || 'Failed to load user profile data'}
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">User data not found</div>
      </section>
    );
  }

  return (
    <section className="relative px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Header sessionStats={data.sessionStats} user={data.user} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div id="overview-tab" className="space-y-8">
            <BodyMeasurements measurementStats={data.measurementStats} />
          </div>
        </div>
        <div className="space-y-8">{/* <RecentAchievements /> */}</div>
      </div>
    </section>
  );
};

export default Profile;
