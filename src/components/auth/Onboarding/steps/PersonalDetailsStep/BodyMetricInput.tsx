import { shallowEqual } from 'react-redux';
import type {
  HeightUnit,
  OnboardingPersonalDetail,
  WeightUnit,
} from '../../../../../config/onboarding-content';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import type { ValidationResult } from '../../../../../utils/types';
import { useState } from 'react';
import { validateHeight, validateWeight } from '../../../../../utils/helpers/validationUtils';
import {
  addUserCurrentWeight,
  addUserHeight,
  addUserTargetWeight,
} from '../../../../../store/slices/onboardingSlice';

type MetricType = 'height' | 'weight' | 'targetWeight';

type BodyMetricInputProps = {
  metric: OnboardingPersonalDetail['height' | 'weight'];
  placeholder: string;
  required: boolean;
  metricType: MetricType;
};

type BodyMetric =
  | {
      value: number;
      unit: HeightUnit;
    }
  | {
      value: number;
      unit: WeightUnit;
    };
type HeightMetric = Extract<BodyMetric, { unit: HeightUnit }>;
type WeightMetric = Extract<BodyMetric, { unit: WeightUnit }>;

const BodyMetricInput: React.FC<BodyMetricInputProps> = ({
  metric,
  placeholder,
  required,
  metricType,
}) => {
  const [value, setValue] = useState<number | undefined>();
  const [unit, setUnit] = useState<HeightUnit | WeightUnit>(metric.unitOption[0]);
  const [metricValidation, setMetricValidation] = useState<ValidationResult | null>(null);

  const dispatch = useAppDispatch();

  const handleBodyMetrics = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value: rawValue } = e.target;
    setMetricValidation(null);
    const newValue = name === metric.htmlFor ? (rawValue ? Number(rawValue) : value) : value;
    const newUnit = name === `${metricType}Unit` ? (rawValue as HeightUnit | WeightUnit) : unit;

    if (name === metric.htmlFor) {
      setValue(rawValue ? Number(rawValue) : undefined);
    }
    if (name === `${metricType}Unit`) {
      setUnit(rawValue as HeightUnit | WeightUnit);
    }

    const finalMetric =
      newValue !== undefined && newUnit !== undefined
        ? {
            value: newValue,
            unit: newUnit,
          }
        : undefined;

    if (finalMetric && finalMetric.value) {
      if (metricType === 'height') {
        const validationResult = validateHeight(finalMetric as HeightMetric);
        if (!validationResult.isValid) {
          setMetricValidation(validationResult);
          return;
        }
        dispatch(addUserHeight(finalMetric as HeightMetric));
      }

      if (metricType === 'weight') {
        const validationResult = validateWeight(finalMetric as WeightMetric);
        if (!validationResult.isValid) {
          setMetricValidation(validationResult);
          return;
        }
        dispatch(addUserCurrentWeight(finalMetric as WeightMetric));
      }
      if (metricType === 'targetWeight') {
        const validationResult = validateWeight(finalMetric as WeightMetric);
        if (!validationResult.isValid) {
          setMetricValidation(validationResult);
          return;
        }
        dispatch(addUserTargetWeight(finalMetric as WeightMetric));
      }
    }
  };

  return (
    <form>
      <label
        htmlFor={metric.htmlFor}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {metric.label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-fitness-red">
            *
          </span>
        ) : null}
      </label>
      <div className="flex gap-2 mt-1">
        <div className="w-full flex flex-col items-center">
          <input
            type="number"
            id={metric.htmlFor}
            name={metric.htmlFor}
            className="rounded-r-none input-field"
            placeholder={placeholder}
            onChange={handleBodyMetrics}
          />
          {metricValidation?.error && (
            <small className="text-fitness-red">{metricValidation.error}</small>
          )}{' '}
        </div>

        <select
          name={`${metric.htmlFor}Unit`}
          className="border-l-0 rounded-l-none select-field self-start"
          onChange={handleBodyMetrics}
        >
          {metric.unitOption.map((unit) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default BodyMetricInput;
