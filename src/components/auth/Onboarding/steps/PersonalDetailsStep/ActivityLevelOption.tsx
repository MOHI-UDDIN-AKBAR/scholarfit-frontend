import type { ActivityLevelDataType } from '../../../../../config/onboarding-content';

type ActivityLevelOptionProps = {
  activityLevel: ActivityLevelDataType;
};

const ActivityLevelOption: React.FC<ActivityLevelOptionProps> = ({ activityLevel }) => {
  return (
    <label className="activity-option">
      <input type="radio" name="activityLevel" value={activityLevel.value} className="sr-only" />
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
