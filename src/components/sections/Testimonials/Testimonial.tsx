import type { TestimonialType } from '../../../config/testimonials';
import { getFirstChar } from '../../../utils/helpers/formatUtils';
import Icon from '../../ui/Icon/Icon';

type TestimonialProps = {
  testimonial: TestimonialType;
};

const Testimonial: React.FC<TestimonialProps> = ({
  testimonial: { name, profession, review, reviewRate },
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center">
        <div className="shrink-0">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
            {getFirstChar(name)}
          </div>
        </div>
        <div className="ml-4">
          <div className="text-lg font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{profession}</div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600 italic">{review}</p>
      </div>
      <div className="mt-4 flex text-yellow-400">
        {Array.from({ length: Math.max(0, Math.min(reviewRate, 5)) }).map((_, i) => (
          <Icon name="star" key={`star-${i}`}></Icon>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
