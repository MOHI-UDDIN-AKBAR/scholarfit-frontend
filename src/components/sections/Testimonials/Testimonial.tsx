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
    <div className="p-6 rounded-lg bg-gray-50">
      <div className="flex items-center">
        <div className="shrink-0">
          <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full bg-primary-100 text-primary-600">
            {getFirstChar(name)}
          </div>
        </div>
        <div className="ml-4">
          <div className="text-lg font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-500">{profession}</div>
        </div>
      </div>
      <div className="mt-4">
        <p className="italic text-gray-600">{review}</p>
      </div>
      <div className="flex mt-4 text-yellow-400">
        {Array.from({ length: Math.max(0, Math.min(reviewRate, 5)) }).map((_, i) => (
          <Icon name="star" key={`star-${i}`}></Icon>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
