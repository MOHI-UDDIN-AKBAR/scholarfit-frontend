import HeaderContent from '../../shared/HeaderContent';
import {
  onboardingHeaderContent,
  onboardingPersonalDetail,
  type Gender,
} from '../../../../../config/onboarding-content';
import InputField from '../../../../ui/Input/InputField';
import BodyMetricInput from './BodyMetricInput';
import ActivityLevelSelector from './ActivityLevelSelector';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import { addUserAge, selectUserGender } from '../../../../../store/slices/onboardingSlice';
import { useMemo, useState } from 'react';
import { validateAge } from '../../../../../utils/helpers/validationUtils';
import type { ValidationResult } from '../../../../../utils/types';

const PersonalDetailsForm: React.FC = () => {
  const { age, gender, height, weight, targetWeight, dailyActivityLevel } = useMemo(
    () => onboardingPersonalDetail,
    [onboardingPersonalDetail]
  );

  const [ageValidation, setAgeValidation] = useState<ValidationResult>();

  const dispatch = useAppDispatch();

  const selectedGender = useAppState(
    (state) => state.onboarding.onboardingData.personalDetails.gender
  );

  const handleUserAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validationResult = validateAge(parseInt(e.target.value));
    setAgeValidation(validationResult);
    if (validationResult.isValid) {
      dispatch(addUserAge(parseInt(e.target.value)));
    }
  };

  const handleUserGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectUserGender(e.target.value as Gender));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <InputField
        name={age.htmlFor}
        type="number"
        id={age.htmlFor}
        placeholder="e.g. 28"
        labelClassName="block text-sm font-medium text-gray-700 mb-1"
        label={age.label}
        required={true}
        error={ageValidation?.error}
        onChange={handleUserAge}
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
              <input
                type="radio"
                name="gender"
                value={value}
                className="sr-only"
                onChange={handleUserGender}
                checked={selectedGender === value ? true : false}
              />
              <span className="capitalize option-display">{value}</span>
            </label>
          ))}
        </div>
      </div>
      <BodyMetricInput
        metricType={'height'}
        metric={height}
        placeholder="e.g. 175"
        required={true}
      />
      <BodyMetricInput
        metricType={'weight'}
        metric={weight}
        placeholder="e.g. 75"
        required={true}
      />
      <BodyMetricInput
        metricType={'targetWeight'}
        metric={targetWeight}
        placeholder="e.g. 70"
        required={false}
      />

      <ActivityLevelSelector dailyActivityLevel={dailyActivityLevel} />
    </div>
  );
};

const PersonalDetailsStep: React.FC = () => {
  return (
    <div id="step-5" className="onboarding-step">
      <HeaderContent headerContent={onboardingHeaderContent.personalDetailsStep} />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-8 sm:p-10">
          <PersonalDetailsForm />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
