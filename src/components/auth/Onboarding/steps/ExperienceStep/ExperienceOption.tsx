import clsx from 'clsx';
import type {
  ExperienceLevel,
  OnboardingExperienceOption,
} from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import { useAppDispatch, useAppState } from '../../../../../store/hooks';
import { selectExperienceLevel } from '../../../../../store/slices/onboardingSlice';

type ExperienceOptionProps = {
  experienceOption: OnboardingExperienceOption;
};

const ExperienceOption: React.FC<ExperienceOptionProps> = ({
  experienceOption: {
    experienceLevel,
    optionContent: { optionIcon, optionTitle, optionSubtitle, optionDescription },
  },
}) => {
  const dispatch = useAppDispatch();

  const handleExperience = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectExperienceLevel(e.target.value as ExperienceLevel));
    }
  };
  const experience = useAppState((state) => state.onboarding.onboardingData.experienceLevel);

  console.log(experience);

  return (
    <label className="experience-option">
      <input
        type="radio"
        name="experience"
        value={experienceLevel}
        onChange={handleExperience}
        checked={experience === experienceLevel ? true : false}
        className="sr-only"
      />
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
