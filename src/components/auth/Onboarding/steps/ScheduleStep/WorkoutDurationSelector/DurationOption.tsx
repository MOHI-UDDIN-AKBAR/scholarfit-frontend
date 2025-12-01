import type { NumericOption } from '../../../../../../config/onboarding-content';

type DurationOptionProps = {
  durationOption: NumericOption;
};

const DurationOption: React.FC<DurationOptionProps> = ({ durationOption: { value, label } }) => {
  return (
    <label className="schedule-option">
      <input type="radio" name="minutesPerSession" value={value.toString()} className="sr-only" />
      <span className="option-display">{label}</span>
    </label>
  );
};

export default DurationOption;
