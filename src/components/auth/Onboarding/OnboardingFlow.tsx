import clsx from 'clsx';
import GoalsStep from './steps/GoalsStep/GoalsStep';
import ExperienceStep from './steps/ExperienceStep/ExperienceStep';
import EquipmentStep from './steps/EquipmentStep/EquipmentStep';
import ScheduleStep from './steps/ScheduleStep/ScheduleStep';
import PersonalDetailsStep from './steps/PersonalDetailsStep/PersonalDetailsStep';
import OnboardingFlowControl from './OnboardingFlowControl/OnboardingFlowControl';
import { useAppState } from '../../../store/hooks';
import { shallowEqual } from 'react-redux';
import { calculateProgressPercentage } from '../../../utils/helpers/calculationUtils';
import type { OnboardingStepName } from '../../../store/slices/onboardingSlice';

const STEP_COMPONENTS = {
  goals: GoalsStep,
  experience: ExperienceStep,
  equipment: EquipmentStep,
  schedule: ScheduleStep,
  'personal-details': PersonalDetailsStep,
} as const;

const OnboardingFlow: React.FC = () => {
  const { currentOnboardingStep, currentStepName } = useAppState(
    (state) => ({
      currentOnboardingStep: state.onboarding.currentOnboardingStep,
      currentStepName: state.onboarding.currentStepName,
    }),
    shallowEqual
  );

  const CurrentStepComponent = STEP_COMPONENTS[currentStepName as OnboardingStepName];

  return (
    <section className={clsx('max-w-3xl mx-auto ')}>
      <section className="overflow-hidden bg-white rounded-lg shadow ">
        <div className="py-4 pb-8 bg-white">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                id="progress-bar"
                className="h-2 transition-all duration-300 rounded-full bg-primary-600"
                style={{ width: `${calculateProgressPercentage(currentOnboardingStep, 20)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <CurrentStepComponent />

        <OnboardingFlowControl />
      </section>
    </section>
  );
};

export default OnboardingFlow;
