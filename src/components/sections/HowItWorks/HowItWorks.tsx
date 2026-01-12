import { GUIDE_STEPS } from '../../../config/guide-steps';
import GuideStep from './GuideStep';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase text-primary-600">
            How It Works
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Get Started in 3 Steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {GUIDE_STEPS.map((guideStep) => (
              <GuideStep key={guideStep.id} guideStep={guideStep} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
