import {
  onboardingGoalCards,
  ONBOARDING_HEADER_CONTENT,
} from '../../../../../config/onboarding-content';
import HeaderContent from '../../shared/HeaderContent';
import GoalCard from './GoalCard';

const GoalCardGroup: React.FC = () => {
  return (
    <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {onboardingGoalCards.map((goalCard) => (
        <GoalCard goalCard={goalCard} key={goalCard.goal} />
      ))}
    </form>
  );
};

const GoalsStep: React.FC = () => {
  return (
    <div id="step-1" className="onboarding-step">
      <HeaderContent headerContent={ONBOARDING_HEADER_CONTENT.goalsStep} />
      <div className="overflow-hidden bg-white ">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            What are your primary fitness goals?
          </h2>
          <p className="mb-8 text-gray-600">Select all that apply to you</p>
          <GoalCardGroup />
        </div>
      </div>
    </div>
  );
};

export default GoalsStep;
