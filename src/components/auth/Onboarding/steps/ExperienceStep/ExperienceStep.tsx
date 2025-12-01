import clsx from 'clsx';
import HeaderContent from '../../shared/HeaderContent';
import {
  onboardingExperienceOptions,
  onboardingHeaderContent,
} from '../../../../../config/onboarding-content';
import Icon from '../../../../ui/Icon/Icon';
import ExperienceOption from './ExperienceOption';

const ExperienceStep: React.FC = () => {
  return (
    <section
      id="step-2"
      className={clsx(
        ' onboarding-step'
        //  'hidden'
      )}
    >
      <HeaderContent headerContent={onboardingHeaderContent.experienceStep} />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-8 sm:p-10">
          <div className="grid space-y-6">
            {onboardingExperienceOptions.map((experienceOption) => (
              <ExperienceOption
                experienceOption={experienceOption}
                key={experienceOption.experienceLevel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceStep;
