import clsx from 'clsx';
import type { OnboardingGoalCard } from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';

type GoalCardProps = {
  goalCard: OnboardingGoalCard;
};

const GoalCard: React.FC<GoalCardProps> = ({
  goalCard: {
    goal,
    cardContent: { cardIcon, cardTitle, cardDescription },
  },
}) => {
  return (
    <label className="goal-card">
      <input type="checkbox" name="goals" value={goal} className="sr-only" />
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
