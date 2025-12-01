import clsx from 'clsx';
import HeaderContent from '../../shared/HeaderContent';
import { onboardingHeaderContent } from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import FrequencyOptionsGroup from './WorkoutFrequencySelector/FrequencyOptionsGroup';
import DurationOptionsGroup from './WorkoutDurationSelector/DurationOptionsGroup';
import SplitOptionsList from './WorkoutSplitSelector/SplitOptionsList';

const ScheduleStep: React.FC = () => {
  return (
    <div
      id="step-4"
      className={clsx(
        'onboarding-step'
        // 'hidden'
      )}
    >
      <HeaderContent headerContent={onboardingHeaderContent.scheduleStep} />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-8 sm:p-10">
          <div className="space-y-8">
            <FrequencyOptionsGroup />

            <DurationOptionsGroup />

            <SplitOptionsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleStep;
