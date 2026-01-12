import { Link } from 'react-router';

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 xl:py-28">
      <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to transform your fitness journey?
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Join thousands of users who have achieved their fitness goals with ScholarFit.
        </p>
        <div className="flex justify-center mt-8">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="/workouts"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white no-underline border border-transparent rounded-md bg-primary-600 hover:bg-primary-700"
            >
              Start Your Journey For Free
            </Link>
          </div>
          <div className="inline-flex ml-3">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-gray-800 border border-transparent rounded-md text-primary-100 hover:bg-gray-700"
            >
              Learn More
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          No credit card required • Free to use • Enjoy your experience risk-free
        </p>
      </div>
    </section>
  );
};

export default CallToActionSection;
