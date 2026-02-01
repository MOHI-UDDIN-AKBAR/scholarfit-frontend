import HeaderContent from '../../shared/HeaderContent';
import FrequencyOptionsGroup from './WorkoutFrequencySelector/FrequencyOptionsGroup';
import DurationOptionsGroup from './WorkoutDurationSelector/DurationOptionsGroup';
import SplitOptionsList from './WorkoutSplitSelector/SplitOptionsList';
import { ONBOARDING_HEADER_CONTENT } from '../../../../../config/onboarding-content';

const ScheduleStep: React.FC = () => {
  return (
    <div id="step-4" className="onboarding-step">
      <HeaderContent headerContent={ONBOARDING_HEADER_CONTENT.scheduleStep} />

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
