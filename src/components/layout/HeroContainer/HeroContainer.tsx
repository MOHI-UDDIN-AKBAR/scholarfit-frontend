import Button from '../../ui/Button/Button';
import Icon from '../../ui/Icon/Icon';

const HeroContainer: React.FC = () => {
  return (
    <section className="grid items-center justify-between p-2 mx-auto max-w-7xl xl:grid-cols-2 my-25 xl:my-40">
      <div className="grid max-xl:place-items-center">
        <small className="block text-sm font-semibold tracking-wide text-gray-600 uppercase sm:text-base lg:text-sm xl:text-base ">
          Smart Fitness Tracking
        </small>
        <h1 className="">
          <span className="block mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
            <span className="block text-gray-900">Transform Your</span>
            <span className="block text-primary-600">Fitness Journey</span>
          </span>
        </h1>
        <p className="w-4/5 mt-3 text-base text-center text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl sm:text-left">
          ScholarFit combines exercise science with smart technology to create personalized workout
          plans, track your progress, and help you achieve your fitness goals faster.
        </p>
        <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button
              type="button"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primary-600 hover:bg-primary-700"
            >
              Start Free Trial
            </Button>
            <Button
              type="button"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Icon name="play" className="w-8 h-6 mr-2" />
              Watch Demo
            </Button>
          </div>
          <p className="mt-3 text-sm text-center text-gray-500 xl:text-left">
            Free to use • No credit card required
          </p>
        </div>
      </div>
      <aside className="px-2 md:px-0 max-xl:my-10">
        <div className="relative w-full mx-auto rounded-lg shadow-lg -z-10 lg:max-w-md">
          <div className="overflow-hidden bg-white rounded-lg">
            <div className="flex items-center px-4 py-2 bg-gray-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-sm font-medium text-center text-white">
                ScholarFit Dashboard
              </div>
            </div>
            <div className="p-4 bg-linear-to-br from-primary-50 to-white">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500">Current Streak</div>
                  <div className="text-lg font-bold text-gray-900">5 days</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500">Weekly Goal</div>
                  <div className="text-lg font-bold text-gray-900">3/4</div>
                </div>
              </div>
              <div className="p-3 mb-4 bg-white rounded-lg shadow-sm">
                <div className="mb-2 text-xs text-gray-500">Today's Workout</div>
                <div className="flex items-center">
                  <div className="p-2 mr-3 rounded-md bg-primary-100">
                    <Icon name="dumbbell" className=" text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Upper Body A</div>
                    <div className="text-xs text-gray-500">10:00 AM • 60 min</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button className="px-3 py-1 text-xs text-white rounded bg-primary-600">
                  Start Workout
                </Button>
                <Button className="px-3 py-1 text-xs text-gray-700 bg-gray-200 rounded">
                  Reschedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default HeroContainer;
