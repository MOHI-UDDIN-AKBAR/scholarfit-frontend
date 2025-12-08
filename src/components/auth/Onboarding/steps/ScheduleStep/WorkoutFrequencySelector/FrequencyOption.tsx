import type { NumericOption } from '../../../../../../config/onboarding-content';
import { useAppDispatch, useAppState } from '../../../../../../store/hooks';
import { selectWorkoutFrequency } from '../../../../../../store/slices/onboardingSlice';

type FrequencyOptionProps = {
  frequencyOption: NumericOption;
};
const FrequencyOption: React.FC<FrequencyOptionProps> = ({ frequencyOption: { value, label } }) => {
  const dispatch = useAppDispatch();

  const handleWorkoutFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectWorkoutFrequency(parseInt(e.target.value) as number));
    }
  };
  const workoutFrequency = useAppState(
    (state) => state.onboarding.onboardingData.schedule.workoutFrequency
  );

  return (
    <label className="schedule-option">
      <input
        type="radio"
        name="daysPerWeek"
        value={value.toString()}
        className="sr-only"
        onChange={handleWorkoutFrequency}
        checked={workoutFrequency === value ? true : false}
      />
      <span className="option-display">{label}</span>
    </label>
  );
};

export default FrequencyOption;
