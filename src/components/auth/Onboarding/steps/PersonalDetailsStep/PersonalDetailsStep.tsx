import clsx from 'clsx';
import HeaderContent from '../../shared/HeaderContent';
import {
  onboardingHeaderContent,
  onboardingPersonalDetail,
} from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import InputField from '../../../../ui/Input/InputField';
import BodyMetricInput from './BodyMetricInput';
import ActivityLevelSelector from './ActivityLevelSelector';

const PersonalDetailsStep: React.FC = () => {
  const { age, gender, height, weight, targetWeight, dailyActivityLevel } =
    onboardingPersonalDetail;
  return (
    <div
      id="step-5"
      className={clsx(
        'onboarding-step'
        // 'hidden'
      )}
    >
      <HeaderContent headerContent={onboardingHeaderContent.personalDetailsStep} />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-8 sm:p-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              name={age.htmlFor}
              type="number"
              id={age.htmlFor}
              placeholder="e.g. 28"
              labelClassName="block text-sm font-medium text-gray-700 mb-1"
              label={age.label}
              required={true}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {gender.label}
                <span aria-hidden="true" className=" text-fitness-red">
                  *
                </span>
              </label>
              <div className="flex mt-1 space-x-4">
                {gender.values.map((value) => (
                  <label className="gender-option" key={value}>
                    <input type="radio" name="gender" value={value} className="sr-only" />
                    <span className="capitalize option-display">{value}</span>
                  </label>
                ))}
              </div>
            </div>
            <BodyMetricInput metric={height} placeholder="e.g. 175" required={true} />
            <BodyMetricInput metric={weight} placeholder="e.g. 75" required={true} />
            <BodyMetricInput metric={targetWeight} placeholder="e.g. 70" required={false} />

            <ActivityLevelSelector dailyActivityLevel={dailyActivityLevel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
