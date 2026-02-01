import clsx from 'clsx';
import { useAppDispatch, useAppState } from '../../../../store/hooks';
import {
  cancelExerciseConfiguration,
  confirmConfigurationState,
  toggleExerciseBrowserModal,
  toggleExerciseModal,
} from '../../../../store/slices/workout-slices/workoutBuilderSlice';
import Button from '../../../ui/Button/Button';
import type { IconName } from '../../../ui/Icon';
import Icon from '../../../ui/Icon/Icon';
import { ExerciseLibraryListCard } from '../ExerciseBrowser/ExerciseLibrary/ExerciseLibraryList/ExerciseLibraryList';
import ExerciseConfigurationForm from './ExerciseConfigurationForm/ExerciseConfigurationForm';
import { shallowEqual } from 'react-redux';

type ModalHeaderProps = {
  title: string;
  iconName: IconName;
};
const ModalHeader: React.FC<ModalHeaderProps> = ({ title, iconName }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        <Button
          id="close-modal"
          className="text-gray-400 hover:text-gray-500"
          onClick={() => dispatch(toggleExerciseModal())}
        >
          <Icon name={iconName} />
        </Button>
      </div>
    </div>
  );
};
const ExerciseDetailsModal: React.FC = () => {
  const { selectedExercise, isReadyToSave } = useAppState(
    (state) => ({
      selectedExercise: state.workoutBuilder.selectedExerciseConfiguration.exercise,
      isReadyToSave: state.workoutBuilder.isReadyToSave,
    }),
    shallowEqual
  );
  const dispatch = useAppDispatch();

  if (!selectedExercise) return null;

  const handleSaveExercise = () => {
    dispatch(confirmConfigurationState({ id: selectedExercise.exerciseId }));
    dispatch(toggleExerciseBrowserModal(false));
  };

  return (
    <div
      id="exercise-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <ModalHeader title="Configure Exercise" iconName="close" />

        <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
          <div id="modal-exercise-info">
            <ExerciseLibraryListCard exercise={selectedExercise} hasButton={false} />
          </div>

          <ExerciseConfigurationForm />
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between">
            <Button
              id="cancel-config"
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              onClick={() => dispatch(cancelExerciseConfiguration())}
            >
              Cancel
            </Button>
            <div className="space-x-3">
              <Button
                id="save-exercise-config"
                type="button"
                className={clsx(
                  'inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none',
                  isReadyToSave
                    ? 'bg-primary-600 hover:bg-primary-700 '
                    : 'bg-gray-600 hover:hover:cursor-not-allowed!'
                )}
                disabled={!isReadyToSave}
                onClick={handleSaveExercise}
              >
                Save Exercise
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailsModal;
