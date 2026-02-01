import { useId } from 'react';
import type { NumericOption } from '../../../../../../config/onboarding-content';
import { useAppDispatch, useAppState } from '../../../../../../store/hooks';
import { selectWorkoutFrequency } from '../../../../../../store/slices/onboardingSlice';
import clsx from 'clsx';

type FrequencyOptionProps = {
  frequencyOption: NumericOption;
  labelClassName?: string;
};
const FrequencyOption: React.FC<FrequencyOptionProps> = ({
  frequencyOption: { value, label },
  labelClassName,
}) => {
  const uniqueId = useId();
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
    <label
      className={clsx('schedule-option', labelClassName && labelClassName)}
      htmlFor={`${uniqueId}-workoutFrequency`}
    >
      <input
        type="radio"
        id={`${uniqueId}-workoutFrequency`}
        name="frequency"
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
