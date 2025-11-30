import type { GuideStepType } from '../../../config/guide-steps';

type GuideStepProps = {
  guideStep: GuideStepType;
};

const GuideStep: React.FC<GuideStepProps> = ({ guideStep: { id, heading, description } }) => {
  return (
    <div className="text-center max-sm:mb-5">
      <div className="flex items-center justify-center w-16 h-16 mx-auto text-xl font-bold rounded-full bg-primary-100 text-primary-600">
        {id}
      </div>
      <h3 className="mt-6 text-lg font-medium text-gray-900 capitalize">{heading}</h3>
      <p className="mt-2 text-base text-gray-500">{description}</p>
    </div>
  );
};

export default GuideStep;
