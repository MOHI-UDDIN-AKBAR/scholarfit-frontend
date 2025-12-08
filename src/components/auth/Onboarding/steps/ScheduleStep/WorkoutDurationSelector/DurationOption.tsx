import type { NumericOption } from '../../../../../../config/onboarding-content';
import { useAppDispatch, useAppState } from '../../../../../../store/hooks';
import { selectWorkoutDuration } from '../../../../../../store/slices/onboardingSlice';

type DurationOptionProps = {
  durationOption: NumericOption;
};

const DurationOption: React.FC<DurationOptionProps> = ({ durationOption: { value, label } }) => {
  const dispatch = useAppDispatch();

  const handleWorkoutDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectWorkoutDuration(parseInt(e.target.value) as number));
    }
  };
  const workoutDuration = useAppState(
    (state) => state.onboarding.onboardingData.schedule.workoutDuration
  );

  return (
    <label className="schedule-option">
      <input
        type="radio"
        name="minutesPerSession"
        value={value.toString()}
        className="sr-only"
        onChange={handleWorkoutDuration}
        checked={workoutDuration === value ? true : false}
      />
      <span className="option-display">{label}</span>
    </label>
  );
};

export default DurationOption;
