import Feature from './Feature';
import { features } from '../../../config/features';

const Features: React.FC = () => {
  return (
    <section className="grid w-full mb-18 lg:mb-24">
      <div className="grid gap-4 place-items-center">
        <h2 className="text-lg font-semibold tracking-wide uppercase text-primary-600">Features</h2>
        <p className="text-5xl font-extrabold text-gray-900 max-sm:text-4xl xl:text-6xl sm:tracking-tight">
          Everything You Need
        </p>
        <p className="mt-1 text-xl text-gray-500 max-sm:text-lg">
          Comprehensive fitness tools designed to help you succeed
        </p>
      </div>

      <div className="mt-16 max-md:px-2">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((featureItem) => (
            <Feature featureItem={featureItem} key={featureItem.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
