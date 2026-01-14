import type { UseMutateFunction } from '@tanstack/react-query';
import type { BodyMeasurementFormErrors } from '../components/progress/MeasurementModal/MeasurementModal';
import type { BodyWeightFormErrors } from '../components/progress/WeightEntryModal/WeightEntryModal';
import type { AppDispatch } from '../store/store';
import { getNumber, getString } from '../utils/helpers/common-utils';
import { validateMeasurement, validateNotes } from '../utils/helpers/validationUtils';
import type {
  BodyMeasurementEntry,
  BodyMeasurementHistory,
  BodyWeightEntry,
  BodyWeightHistory,
  CreateBodyMeasurementInput,
  CreateBodyWeightInput,
  MeasurementKey,
} from '../types/progress';
import type { ApiErrorResponse } from '../types/api';
import type { AxiosError } from 'axios';
import type { WeightUnit } from '../types/onboarding';
import type { LengthUnit, PercentageUnit } from '../types/user-profile';
import { toggleMeasurementModal, toggleWeightModal } from '../store/slices/progressSlice';

export const BODY_WEIGHT_LIMITS = {
  MIN_KG: 20,
  MAX_KG: 300,
};

export const BODY_MEASUREMENT_LIMITS = {
  chest: { min: 40, max: 200 },
  waist: { min: 40, max: 200 },
  arms: { min: 15, max: 80 },
  hips: { min: 50, max: 220 },
  thighs: { min: 30, max: 120 },
  bodyFat: { min: 3, max: 70 },
};

type BodyWeightMutation = UseMutateFunction<
  BodyWeightEntry,
  AxiosError<ApiErrorResponse, any>,
  CreateBodyWeightInput,
  {
    previousHistory: BodyWeightHistory | undefined;
    previousLatest: BodyWeightEntry | undefined;
  }
>;
export const saveBodyWeight = async (
  _: unknown,
  formData: FormData,
  dispatch: AppDispatch,
  setFormErrors: React.Dispatch<React.SetStateAction<BodyWeightFormErrors | null>>,
  onBodyWeightMutation: BodyWeightMutation,
  userId: string
): Promise<void> => {
  const bodyWeight = getNumber(formData, 'bodyWeight');
  const bodyWeightUnit = getString(formData, 'unit') as WeightUnit;
  const weightNotes = getString(formData, 'weightNotes');

  if (bodyWeight < BODY_WEIGHT_LIMITS.MIN_KG || bodyWeight > BODY_WEIGHT_LIMITS.MAX_KG) {
    setFormErrors({
      weight: `Weight must be between ${BODY_WEIGHT_LIMITS.MIN_KG}kg and ${BODY_WEIGHT_LIMITS.MAX_KG}kg`,
    });
    return;
  }

  if (!validateNotes(weightNotes).isValid) {
    setFormErrors({
      notes: 'Notes must be below 350 characters',
    });
    return;
  }

  setFormErrors(null);

  const payloadData = { value: bodyWeight, unit: bodyWeightUnit, notes: weightNotes, userId };

  dispatch(toggleWeightModal(false));
  onBodyWeightMutation(payloadData);
};

type BodyMeasurementMutation = UseMutateFunction<
  BodyMeasurementEntry,
  AxiosError<ApiErrorResponse, any>,
  CreateBodyMeasurementInput,
  {
    previousLatest: BodyMeasurementEntry | undefined;
    previousHistory: BodyMeasurementHistory | undefined;
  }
>;
export const saveBodyMeasurements = async (
  _: unknown,
  formData: FormData,
  dispatch: AppDispatch,
  setFormErrors: React.Dispatch<React.SetStateAction<BodyMeasurementFormErrors>>,
  onBodyMeasurementMutation: BodyMeasurementMutation,
  userId: string
): Promise<void> => {
  const errors: BodyMeasurementFormErrors = {};

  const normalizeToCm = (value: number, unit: string) => (unit === 'inches' ? value * 2.54 : value);

  const readAndNormalizeMeasurement = (key: MeasurementKey): number => {
    const rawValue = getNumber(formData, key);
    if (key === 'bodyFat') return rawValue;
    const unit = getString(formData, `${key}Unit`);
    return normalizeToCm(rawValue, unit);
  };
  const measurements: Record<MeasurementKey, number> = {
    chest: readAndNormalizeMeasurement('chest'),
    waist: readAndNormalizeMeasurement('waist'),
    arms: readAndNormalizeMeasurement('arms'),
    hips: readAndNormalizeMeasurement('hips'),
    thighs: readAndNormalizeMeasurement('thighs'),
    bodyFat: readAndNormalizeMeasurement('bodyFat'),
  };

  (Object.keys(measurements) as MeasurementKey[]).forEach((key) => {
    const error = validateMeasurement(key, measurements[key]);
    if (error) {
      errors[key] = error;
    }
  });

  const measurementDate = getString(formData, 'measurementDate');
  const measurementTime = getString(formData, 'measurementTime');
  const measurementNotes = getString(formData, 'measurementNotes');

  if (!validateNotes(measurementNotes).isValid) {
    errors['notes'] = 'Notes must be below 350 characters';
  }

  if (!measurementDate) {
    errors.date = 'Date is required';
  }

  if (!measurementTime) {
    errors.time = 'Time is required';
  }

  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }
  setFormErrors({});

  const measurementPayload = {
    userId,
    measurements: {
      chest: { value: measurements.chest, unit: 'cm' as LengthUnit },
      waist: { value: measurements.waist, unit: 'cm' as LengthUnit },
      arms: { value: measurements.arms, unit: 'cm' as LengthUnit },
      hips: { value: measurements.hips, unit: 'cm' as LengthUnit },
      thighs: { value: measurements.thighs, unit: 'cm' as LengthUnit },
      bodyFat: { value: measurements.bodyFat, unit: '%' as PercentageUnit },
    },
    notes: measurementNotes,
    date: measurementDate,
    time: measurementTime,
  };

  dispatch(toggleMeasurementModal(false));
  onBodyMeasurementMutation(measurementPayload);
};
