import HeaderContent from '../../shared/HeaderContent';
import {
  onboardingExperienceOptions,
  ONBOARDING_HEADER_CONTENT,
} from '../../../../../config/onboarding-content';
import ExperienceOption from './ExperienceOption';

const ExperienceOptionGroup: React.FC = () => {
  return (
    <form className="grid space-y-6">
      {onboardingExperienceOptions.map((experienceOption) => (
        <ExperienceOption
          experienceOption={experienceOption}
          key={experienceOption.experienceLevel}
        />
      ))}
    </form>
  );
};

const ExperienceStep: React.FC = () => {
  return (
    <section id="step-2" className="onboarding-step">
      <HeaderContent headerContent={ONBOARDING_HEADER_CONTENT.experienceStep} />

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <div className="px-6 py-8 sm:p-10">
          <ExperienceOptionGroup />
        </div>
      </div>
    </section>
  );
};

export default ExperienceStep;
