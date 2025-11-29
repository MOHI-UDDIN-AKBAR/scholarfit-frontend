import clsx from 'clsx';
import { footerData, socialLinks } from '../../../config/footer';
import Icon from '../../ui/Icon/Icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <Icon name="dumbbell" className="text-primary-400 text-2xl mr-2" />
              <span className="font-bold text-xl text-white">ScholarFit</span>
            </div>
            <p className="text-gray-300 text-base">
              Smart fitness tracking and personalized workout plans to help you achieve your goals
              faster.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map(({ name, href }) => (
                <a key={name} href={href} aria-label={name}>
                  <Icon name={name} className="text-gray-300 hover:text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 xl:mt-0 xl:col-span-2 grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerData.map(({ title, links }) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase lg:text-lg">
                  {title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="text-base text-gray-300 hover:text-white">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2025 ScholarFit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
