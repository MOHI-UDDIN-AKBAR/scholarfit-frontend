import { useActionState, useState } from 'react';
import { saveBodyMeasurements } from '../../../actions/progress-action';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import { useAppDispatch, useAppState } from '../../../store/hooks';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';
import { toggleMeasurementModal } from '../../../store/slices/progressSlice';
import { useAddMeasurementEntry } from '../../../services/mutations/progress';
import type { IconName } from '../../ui/Icon';
import type { MeasurementKey } from '../../../types/progress';

export interface MeasurementTip {
  id: string;
  icon: IconName;
  text: string;
}

export const measurementTips: MeasurementTip[] = [
  {
    id: 'tip-1',
    icon: 'ruler',
    text: 'Measure at the same time each day',
  },
  {
    id: 'tip-2',
    icon: 'user',
    text: 'Stand relaxed, tape parallel to floor',
  },
];

export interface MeasurementField {
  id: MeasurementKey;
  label: string;
  icon: IconName;
  placeholder: string;
  unitOptions: string[];
  iconColor: string;
  lastValue?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    color: string;
  };
  inputType?: 'number' | 'text' | 'date' | 'time';
  step?: number;
  ringColor?: string;
}

export const measurementFields: MeasurementField[] = [
  {
    id: 'chest',
    label: 'Chest',
    iconColor: 'text-blue-600',
    icon: 'heart',
    placeholder: '102.0',
    unitOptions: ['cm', 'inches'],
    lastValue: '101.5 cm',
    trend: { value: '+0.5', direction: 'up', color: 'text-green-600' },
    inputType: 'number',
    step: 0.1,
    ringColor: 'focus:ring-blue-500',
  },
  {
    id: 'waist',
    label: 'Waist',
    iconColor: 'text-green-600',
    icon: 'circle',
    placeholder: '86.0',
    unitOptions: ['cm', 'inches'],
    lastValue: '86.5 cm',
    trend: { value: '-0.5', direction: 'down', color: 'text-red-600' },
    inputType: 'number',
    step: 0.1,
    ringColor: 'focus:ring-green-500',
  },
  {
    id: 'arms',
    label: 'Arms',
    iconColor: 'text-orange-600',
    icon: 'hand',
    placeholder: '36.0',
    unitOptions: ['cm', 'inches'],
    lastValue: '35.8 cm',
    trend: { value: '+0.2', direction: 'up', color: 'text-green-600' },
    inputType: 'number',
    step: 0.1,
    ringColor: 'focus:ring-orange-500',
  },
  {
    id: 'bodyFat',
    label: 'Body Fat',
    iconColor: 'text-purple-600',
    icon: 'percent',
    placeholder: '18.0',
    unitOptions: ['%'],
    lastValue: '18.5%',
    trend: { value: '-0.5', direction: 'down', color: 'text-green-600' },
    inputType: 'number',
    step: 0.1,
    ringColor: 'focus:ring-purple-500',
  },
  {
    id: 'hips',
    label: 'Hips',
    iconColor: 'text-pink-600',
    icon: 'user',
    placeholder: '98.0',
    unitOptions: ['cm', 'inches'],
    lastValue: '98.5 cm',
    trend: { value: '-0.5', direction: 'down', color: 'text-green-600' },
    inputType: 'number',
    step: 0.1,
    ringColor: 'focus:ring-pink-500',
  },
  {
    id: 'thighs',
    label: 'Thighs',
    iconColor: 'text-teal-600',
    icon: 'personRunning',
    placeholder: '58.0',
    unitOptions: ['cm', 'inches'],
    lastValue: '58.0 cm',
    trend: { value: '0', direction: 'neutral', color: 'text-gray-600' },
    inputType: 'number',
    step: 0.1,
    ringColor: 'focus:ring-teal-500',
  },
];

export type BodyMeasurementFormErrors = Partial<
  Record<MeasurementKey | 'notes' | 'date' | 'time', string>
>;

const MeasurementModal: React.FC = () => {
  const [formErrors, setFormErrors] = useState<BodyMeasurementFormErrors>({});
  const dispatch = useAppDispatch();
  const userId = useAppState((state) => state.auth.userInfo?.id);

  const { mutate: onBodyMeasurementMutation, isPending } = useAddMeasurementEntry();

  if (!userId) return null;

  const handleMeasurementSubmit = (prevState: unknown, formData: FormData) =>
    saveBodyMeasurements(
      prevState,
      formData,
      dispatch,
      setFormErrors,
      onBodyMeasurementMutation,
      userId
    );

  const [_, submitAction, isSubmitting] = useActionState(handleMeasurementSubmit, null);

  return (
    <form
      action={submitAction}
      className="fixed inset-0 z-50 w-full h-full overflow-y-auto transition-opacity duration-300 bg-gray-600 bg-opacity-50 top-18 max-xl:top-16"
    >
      <div className="relative w-full max-w-4xl p-0 mx-auto overflow-hidden bg-white rounded-md shadow-2xl top-4 animate-slideUp">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Icon name="ruler" className="text-green-600" /> <span>Add Body Measurement</span>
            </h3>
            <p className="mt-1 text-base text-gray-600">
              Track your progress with detailed measurements
            </p>
          </div>
          <Button
            className="text-gray-400 transition-colors hover:text-gray-600"
            onClick={() => dispatch(toggleMeasurementModal(false))}
          >
            <Icon name="close" size={8} className="font-bold text-blue-800"></Icon>
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
              <Icon name="calculator" className="mr-2 -mt-1"></Icon>
              <span>Measurement Date</span>
              <span aria-hidden="true" className="ml-1 text-fitness-red">
                *
              </span>
            </label>
            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <input
                  type="date"
                  id="measurement-date"
                  name="measurementDate"
                  className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {formErrors?.date && (
                  <p className="px-2 mt-2 text-sm text-fitness-red">{formErrors.date}</p>
                )}
              </div>

              <div>
                <input
                  type="time"
                  id="measurement-time"
                  name="measurementTime"
                  className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {formErrors?.time && (
                  <p className="px-2 mt-2 text-sm text-fitness-red">{formErrors?.time}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
            {measurementFields.map((field) => (
              <div className="measurement-input" key={field.id}>
                <label
                  className="flex items-center mb-2 text-sm font-medium text-gray-700"
                  htmlFor={`${field.id}-measurement`}
                >
                  <Icon name={field.icon} className={`mr-2 ${field.iconColor}`} />
                  <span>{field.label}</span>
                  <span className="ml-1 text-fitness-red">*</span>
                </label>
                <div className="flex">
                  <input
                    type={field.inputType}
                    id={`${field.id}-measurement`}
                    name={`${field.id}`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                  <div className="border border-l-0 border-gray-300 rounded-r-lg px-4 py-3 bg-gray-50 min-w-[100px]">
                    <select className="w-full bg-transparent" name={`${field.id}Unit`}>
                      {field.unitOptions.map((unit) => (
                        <option value={unit} key={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {formErrors?.[field.id] && (
                  <p className="px-2 mt-2 text-sm text-fitness-red">{formErrors[field.id]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-700"
              htmlFor="measurement-notes"
            >
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              id="measurement-notes"
              name="measurementNotes"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Morning measurement, flexed/relaxed state, etc..."
            ></textarea>
            {formErrors?.notes && (
              <p className="px-2 mt-2 text-sm text-fitness-red">{formErrors.notes}</p>
            )}
          </div>

          <div className="p-4 mb-6 bg-blue-50 rounded-xl">
            <h4 className="mb-2 font-medium text-blue-800">Measurement Tips</h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {measurementTips.map((tips) => (
                <div className="flex items-start" key={tips.id}>
                  <div className="flex items-center justify-center w-6 h-6 mr-2 -mt-1 rounded-full shrink-0">
                    <Icon name={tips.icon} className="text-xs text-blue-600"></Icon>
                  </div>
                  <span className="text-sm text-blue-700">{tips.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl ">
          <Button
            onClick={() => dispatch(toggleMeasurementModal(false))}
            type="button"
            className="px-6 py-2 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button type="submit">
            {isSubmitting || isPending ? (
              <LoadingSpinner
                text="Saving Measurements..."
                showText={true}
                variant="white"
                size="sm"
                textClassName="text-white! text-sm"
              />
            ) : (
              <>
                <Icon name="save" className="mr-2"></Icon> Save Measurements
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="mb-10 bg-gray-600! bg-opacity-50! h-15 "></div>
    </form>
  );
};

export default MeasurementModal;
