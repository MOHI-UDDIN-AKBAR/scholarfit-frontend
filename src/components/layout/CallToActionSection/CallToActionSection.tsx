const CallToActionSection: React.FC = () => {
  return (
    <section className="py-16 xl:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to transform your fitness journey?
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Join thousands of users who have achieved their fitness goals with ScholarFit.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 no-underline"
            >
              Start Your Free Trial
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-100 bg-gray-800 hover:bg-gray-700"
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
