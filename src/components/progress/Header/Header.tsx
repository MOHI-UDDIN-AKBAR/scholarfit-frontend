import clsx from 'clsx';
import { useAppDispatch, useAppState } from '../../../store/hooks';
import { shallowEqual } from 'react-redux';
import Button from '../../ui/Button/Button';
import { selectTab } from '../../../store/slices/progressSlice';

const Header: React.FC = () => {
  const { progressTabs, currentTab } = useAppState(
    (state) => ({
      progressTabs: state.progress.progressTabs,
      currentTab: state.progress.currentTab,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();
  return (
    <header className="px-4 sm:px-0">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="py-3 text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
            Progress Tracking
          </h1>
          <p className="text-base text-gray-500 ">
            Monitor your fitness journey with detailed analytics and visual progress tracking.
          </p>
        </div>
      </div>

      <div className="mt-6 border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {progressTabs.map((tab) => (
            <Button
              key={tab.id}
              type="button"
              data-tab="library"
              onClick={() => dispatch(selectTab(tab))}
              className={clsx(
                'px-1 py-4 text-base lg:text-base font-medium tab-link whitespace-nowrap',
                currentTab.id === tab.id
                  ? 'text-blue-600 border-b-2 border-primary-500'
                  : 'text-gray-600'
              )}
            >
              {tab.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
