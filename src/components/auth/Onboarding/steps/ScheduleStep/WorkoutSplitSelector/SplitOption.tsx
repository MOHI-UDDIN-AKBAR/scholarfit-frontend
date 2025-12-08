import type { SplitOptionType } from '../../../../../../config/onboarding-content';
import { useAppDispatch, useAppState } from '../../../../../../store/hooks';
import { selectPreferredWorkoutSplit } from '../../../../../../store/slices/onboardingSlice';

type SplitOptionProps = {
  splitOption: SplitOptionType;
};

const SplitOption: React.FC<SplitOptionProps> = ({
  splitOption: { value, title, description },
}) => {
  const dispatch = useAppDispatch();

  const handleWorkoutSplit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectPreferredWorkoutSplit(e.target.value as string));
    }
  };

  const preferredWorkoutSplit = useAppState(
    (state) => state.onboarding.onboardingData.schedule.preferredWorkoutSplit
  );

  return (
    <label className="split-option">
      <input
        type="radio"
        name="preferredSplit"
        value={value}
        className="sr-only"
        onChange={handleWorkoutSplit}
        checked={preferredWorkoutSplit === value ? true : false}
      />
      <div className="flex items-center option-content">
        <div className="option-text">
          <span className="option-title">{title}</span>
          <span className="option-description">{description}</span>
        </div>
        <div className="option-radio"></div>
      </div>
    </label>
  );
};

export default SplitOption;
