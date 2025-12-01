import clsx from 'clsx';
import type { OnboardingExperienceOption } from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';

type ExperienceOptionProps = {
  experienceOption: OnboardingExperienceOption;
};

const ExperienceOption: React.FC<ExperienceOptionProps> = ({
  experienceOption: {
    experienceLevel,
    optionContent: { optionIcon, optionTitle, optionSubtitle, optionDescription },
  },
}) => {
  return (
    <label className="experience-option">
      <input type="radio" name="experience" value={experienceLevel} className="sr-only" />
      <div className="option-content">
        <div className="option-header">
          <div className={clsx('option-icon', optionIcon.iconStyle ? optionIcon.iconStyle : '')}>
            <Icon name={optionIcon.icon}></Icon>
          </div>
          <div className="option-text">
            <span className="option-title">{optionTitle}</span>
            <span className="option-subtitle">{optionSubtitle}</span>
          </div>
          <div className="option-radio"></div>
        </div>
        <div className="option-description">
          <p>{optionDescription}</p>
        </div>
      </div>
    </label>
  );
};

export default ExperienceOption;
