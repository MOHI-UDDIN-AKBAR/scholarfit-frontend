import clsx from 'clsx';
import Icon from '../../ui/Icon/Icon';

const HeroContainer: React.FC = () => {
  return (
    <section
      className={clsx('p-2', 'grid xl:grid-cols-2 justify-between items-center', 'my-25 xl:my-40')}
    >
      <div className={clsx(' grid place-items-center')}>
        <small
          className={clsx(
            'text-gray-600',
            'block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base '
          )}
        >
          Smart Fitness Tracking
        </small>
        <h1 className="">
          <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
            <span className="block text-gray-900">Transform Your</span>
            <span className="block text-primary-600">Fitness Journey</span>
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl w-4/5 text-center sm:text-left">
          ScholarFit combines exercise science with smart technology to create personalized workout
          plans, track your progress, and help you achieve your fitness goals faster.
        </p>
        <div className={clsx('mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0')}>
          <div className={clsx('flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4')}>
            <button
              type="button"
              className={clsx(
                'inline-flex items-center justify-center px-5 py-3 border border-transparent text-base  font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700'
              )}
            >
              Start Free Trial
            </button>
            <button
              type="button"
              className={clsx(
                'inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              )}
            >
              <Icon name="play" className="mr-2 w-8 h-6" />
              Watch Demo
            </button>
          </div>
          <p className={clsx('mt-3 text-sm text-gray-500', 'text-center xl:text-left')}>
            Free to use • No credit card required
          </p>
        </div>
      </div>
      <aside className={clsx('px-2 md:px-0 max-xl:my-10 ')}>
        <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-white text-sm font-medium">
                ScholarFit Dashboard
              </div>
            </div>
            <div className="p-4 bg-linear-to-br from-primary-50 to-white">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500">Current Streak</div>
                  <div className="text-lg font-bold text-gray-900">5 days</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500">Weekly Goal</div>
                  <div className="text-lg font-bold text-gray-900">3/4</div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                <div className="text-xs text-gray-500 mb-2">Today's Workout</div>
                <div className="flex items-center">
                  <div className="bg-primary-100 p-2 rounded-md mr-3">
                    <Icon name="dumbbell" className=" text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Upper Body A</div>
                    <div className="text-xs text-gray-500">10:00 AM • 60 min</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="text-xs bg-primary-600 text-white px-3 py-1 rounded">
                  Start Workout
                </button>
                <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default HeroContainer;
