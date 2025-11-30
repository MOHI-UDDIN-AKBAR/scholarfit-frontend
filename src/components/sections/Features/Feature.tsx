import clsx from 'clsx';
import type { FeatureType } from '../../../config/features';
import Icon from '../../ui/Icon/Icon';

type FeatureProps = {
  featureItem: FeatureType;
};
const Feature: React.FC<FeatureProps> = ({ featureItem: { title, color, label, text } }) => {
  return (
    <div className="pt-6">
      <div className="flow-root px-6 pb-8 rounded-lg bg-gray-50">
        <div className="-mt-6">
          <div>
            <span
              className={clsx(
                'inline-flex items-center justify-center p-3 rounded-md shadow-lg',
                color
              )}
            >
              <Icon name={label} className="w-6 h-6 text-white lg:w-8 lg:h-8"></Icon>
            </span>
          </div>
          <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{title}</h3>
          <p className="mt-5 text-base text-gray-500">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
