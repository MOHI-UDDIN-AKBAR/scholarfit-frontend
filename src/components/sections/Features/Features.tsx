import clsx from 'clsx';
import Feature from './Feature';
import { features } from '../../../config/features';

const Features: React.FC = () => {
  return (
    <section className={clsx('grid w-full mb-18 lg:mb-24')}>
      <div className={clsx('grid place-items-center gap-4')}>
        <h2 className={clsx('uppercase text-primary-600 font-semibold text-lg tracking-wide')}>
          Features
        </h2>
        <p
          className={clsx(
            'max-sm:text-4xl text-5xl xl:text-6xl sm:tracking-tight font-extrabold text-gray-900'
          )}
        >
          Everything You Need
        </p>
        <p className={clsx('mt-1 max-sm:text-lg text-xl text-gray-500')}>
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
