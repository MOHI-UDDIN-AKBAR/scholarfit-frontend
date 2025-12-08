import type {
  ActivityLevel,
  ActivityLevelDataType,
} from '../../../../../config/onboarding-content';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import { selectUserActivityLevel } from '../../../../../store/slices/onboardingSlice';

type ActivityLevelOptionProps = {
  activityLevel: ActivityLevelDataType;
};

const ActivityLevelOption: React.FC<ActivityLevelOptionProps> = ({ activityLevel }) => {
  const dispatch = useAppDispatch();

  const handleActivityLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectUserActivityLevel(e.target.value as ActivityLevel));
    }
  };
  const dailyActivityLevel = useAppState(
    (state) => state.onboarding.onboardingData.personalDetails.activityLevel
  );

  return (
    <label className="activity-option">
      <input
        type="radio"
        name="activityLevel"
        value={activityLevel.value}
        className="sr-only"
        onChange={handleActivityLevel}
        checked={dailyActivityLevel === activityLevel.value ? true : false}
      />
      <div className="flex items-center option-content">
        <div className="option-text">
          <span className="option-title">{activityLevel.optionText.title}</span>
          <span className="option-description">{activityLevel.optionText.description}</span>
        </div>
        <div className="option-radio"></div>
      </div>
    </label>
  );
};

export default ActivityLevelOption;
