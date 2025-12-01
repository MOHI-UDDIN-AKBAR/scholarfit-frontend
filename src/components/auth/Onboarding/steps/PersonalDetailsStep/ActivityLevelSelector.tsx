import type { OnboardingPersonalDetail } from '../../../../../config/onboarding-content';
import ActivityLevelOption from './ActivityLevelOption';

type ActivityLevelSelectorProps = {
  dailyActivityLevel: OnboardingPersonalDetail['dailyActivityLevel'];
};
const ActivityLevelSelector: React.FC<ActivityLevelSelectorProps> = ({ dailyActivityLevel }) => {
  return (
    <div className="sm:col-span-2">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {dailyActivityLevel.label}
        <span aria-hidden="true" className="ml-1 text-fitness-red">
          *
        </span>
      </label>
      <div className="grid space-y-3 ">
        {dailyActivityLevel.activityLevels.map((activityLevel) => (
          <ActivityLevelOption activityLevel={activityLevel} key={activityLevel.value} />
        ))}
      </div>
    </div>
  );
};

export default ActivityLevelSelector;
