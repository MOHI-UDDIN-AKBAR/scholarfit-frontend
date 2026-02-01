import ExerciseLibrary from './ExerciseLibrary/ExerciseLibrary';

const ExerciseBrowserModal: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 pt-22 max-xl:pt-16">
      <div className="rounded-lg shadow-xl max-w-2xl w-full mx-4 sm:max-h-[90vh] max-h-[80vh] sm:overflow-hidden overflow-auto">
        <ExerciseLibrary />
      </div>
    </div>
  );
};

export default ExerciseBrowserModal;
