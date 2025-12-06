import clsx from 'clsx';
import type { OnboardingGoalCard } from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import {
  selectFitnessGoal,
  type OnboardingFitnessGoal,
} from '../../../../../store/slices/onboardingSlice';

type GoalCardProps = {
  goalCard: OnboardingGoalCard;
};

const GoalCard: React.FC<GoalCardProps> = ({
  goalCard: {
    goal,
    cardContent: { cardIcon, cardTitle, cardDescription },
  },
}) => {
  const dispatch = useAppDispatch();

  const handleFitnessGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectFitnessGoal(e.target.value as OnboardingFitnessGoal));
    }
  };
  const fitnessGoal = useAppState((state) => state.onboarding.onboardingData.fitnessGoal);

  return (
    <label className="goal-card">
      <input
        type="checkbox"
        name={`goal-${goal}`}
        value={goal}
        checked={fitnessGoal?.includes(goal as OnboardingFitnessGoal) ? true : false}
        onChange={handleFitnessGoal}
        className="sr-only"
      />
      <div className="card-content">
        <div className={clsx('card-icon', cardIcon.iconStyle ? cardIcon.iconStyle : '')}>
          <Icon name={cardIcon.icon}></Icon>
        </div>
        <div className="card-text">
          <span className="card-title">{cardTitle}</span>
          <span className="card-description">{cardDescription}</span>
        </div>
      </div>
    </label>
  );
};

export default GoalCard;
