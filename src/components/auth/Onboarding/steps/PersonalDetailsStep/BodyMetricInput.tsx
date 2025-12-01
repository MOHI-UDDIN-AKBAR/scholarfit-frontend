import type { OnboardingPersonalDetail } from '../../../../../config/onboarding-content';

type BodyMetricInputProps = {
  metric: OnboardingPersonalDetail['height' | 'weight'];
  placeholder: string;
  required: boolean;
};

const BodyMetricInput: React.FC<BodyMetricInputProps> = ({ metric, placeholder, required }) => {
  return (
    <div>
      <label
        htmlFor={metric.htmlFor}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {metric.label}
        {required ? (
          <span aria-hidden="true" className="ml-1  text-fitness-red">
            *
          </span>
        ) : null}
      </label>
      <div className="flex gap-2 mt-1">
        <input
          type="number"
          id={metric.htmlFor}
          name={metric.htmlFor}
          className="rounded-r-none input-field"
          placeholder={placeholder}
        />
        <select name="heightUnit" className="border-l-0 rounded-l-none select-field">
          {metric.unitOption.map((unit) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BodyMetricInput;
