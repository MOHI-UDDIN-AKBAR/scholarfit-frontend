import { useActionState, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { toggleWeightModal } from '../../../store/slices/progressSlice';
import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';
import { saveBodyWeight } from '../../../actions/progress-action';
import { LoadingSpinner } from '../../shared/LoadingSpinner/LoadingSpinner';

export type BodyWeightFormErrors = {
  weight?: string;
  notes?: string;
};

const WeightEntryModal: React.FC = () => {
  const [formErrors, setFormErrors] = useState<BodyWeightFormErrors | null>(null);
  const dispatch = useAppDispatch();

  const submitBodyWeightAction = (prevState: unknown, formData: FormData) =>
    saveBodyWeight(prevState, formData, dispatch, setFormErrors);

  const [_, submitBodyWeight, isSubmitting] = useActionState(submitBodyWeightAction, null);

  return (
    <form
      action={submitBodyWeight}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 pt-22 max-xl:pt-16"
    >
      <div className="relative w-full max-w-4xl p-0 mx-auto bg-white border shadow-2xl top-4 rounded-2xl animate-slideUp">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Icon name="weight" className="text-green-600" /> <span>Add Body Weight</span>
            </h3>
            <p className="mt-1 text-base text-gray-600">
              Track your progress with detailed body weight
            </p>
          </div>
          <Button
            className="text-gray-400 transition-colors hover:text-gray-600"
            onClick={() => dispatch(toggleWeightModal(false))}
          >
            <Icon name="close" size={8} className="font-bold text-blue-800"></Icon>
          </Button>
        </div>
        <div className="p-6">
          {/* <div className="mb-6">
            <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
              <Icon name="calculator" className="mr-2 -mt-1"></Icon>
              <span>Entry Date and Time</span>
            </label>
            <div className="flex space-x-4">
              <input
                type="date"
                id="entry-date"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="time"
                id="entry-time"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div> */}

          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
            <div className="measurement-input">
              <label
                className="flex items-center mb-2 text-sm font-medium text-gray-700"
                htmlFor="body-weight"
              >
                Body Weight
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="body-weight"
                  name="bodyWeight"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="80.58"
                />
                <div className="border border-l-0 border-gray-300 rounded-r-lg px-4 py-3 bg-gray-50 min-w-[100px]">
                  <select
                    className="inline-flex items-center px-3 text-gray-500 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 sm:text-sm"
                    name="unit"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
              {formErrors?.weight && (
                <p className="mt-2 text-sm text-fitness-red">{formErrors?.weight}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="weight-notes" className="block text-sm font-medium text-gray-700">
              Notes (Optional)
            </label>
            <div className="mt-1">
              <textarea
                id="weight-notes"
                name="weightNotes"
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Morning weight, after workout, etc..."
              ></textarea>
            </div>
            {formErrors?.notes && (
              <p className="mt-2 text-sm text-fitness-red">{formErrors?.notes}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end pb-4 pr-4 mt-8 space-x-3">
          <Button
            type="button"
            onClick={() => dispatch(toggleWeightModal(false))}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cancel-btn hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </Button>
          <Button type="submit">
            {isSubmitting ? (
              <LoadingSpinner
                text="Saving Entry..."
                showText={true}
                variant="white"
                size="sm"
                textClassName="text-white! text-sm"
              />
            ) : (
              <>
                <Icon name="save" className="mr-2"></Icon>
                Save Entry
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WeightEntryModal;
