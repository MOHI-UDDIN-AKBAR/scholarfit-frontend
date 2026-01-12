import clsx from 'clsx';
import { useAppState } from '../../../../../store/hooks';

const StepIndicator: React.FC = () => {
  const { currentStep, steps } = useAppState((state) => state.workoutBuilder.stepIndicator);

  return (
    <div className="relative mt-8">
      <div className="grid grid-cols-3 mx-auto justify-items-center">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center px-2.5 bg-white">
            <div
              className={clsx(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
                step.isCompleted
                  ? 'bg-green-600 text-white'
                  : currentStep.id === step.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700'
              )}
            >
              {step.id}
            </div>

            <div
              className={clsx(
                'ml-2 text-sm font-medium max-sm:hidden border-red-400',
                step.isCompleted
                  ? 'text-green-700'
                  : currentStep.id === step.id
                    ? 'text-gray-900'
                    : 'text-gray-500'
              )}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-auto mx-auto -mt-4 border-2 border-t-2 border-gray-200 max-w-4/6 -z-10" />
    </div>
  );
};

export default StepIndicator;
