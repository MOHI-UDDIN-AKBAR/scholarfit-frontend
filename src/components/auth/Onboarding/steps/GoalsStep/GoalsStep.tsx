import {
  onboardingGoalCards,
  onboardingHeaderContent,
} from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import HeaderContent from '../../shared/HeaderContent';
import GoalCard from './GoalCard';

const GoalsStep: React.FC = () => {
  return (
    <div id="step-1" className="onboarding-step">
      <HeaderContent headerContent={onboardingHeaderContent.goalsStep} />
      <div className="overflow-hidden bg-white ">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            What are your primary fitness goals?
          </h2>
          <p className="mb-8 text-gray-600">Select all that apply to you</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {onboardingGoalCards.map((goalCard) => (
              <GoalCard goalCard={goalCard} key={goalCard.goal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsStep;
