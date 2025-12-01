import type { OnboardingHeaderContent } from '../../../../config/onboarding-content';

type HeaderContentProps = {
  headerContent: OnboardingHeaderContent[keyof OnboardingHeaderContent];
};

const HeaderContent: React.FC<HeaderContentProps> = ({ headerContent }) => {
  return (
    <div className="mb-4 text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {headerContent.headerTitle}
      </h1>
      <p className="mt-4 text-lg text-gray-600">{headerContent.headerContent}</p>
    </div>
  );
};

export default HeaderContent;
