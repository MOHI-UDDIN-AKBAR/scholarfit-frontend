import { platformStats } from '../../../config/platform-stats';

const PlatformStats: React.FC = () => {
  return (
    <section className="py-16 bg-primary-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {platformStats.map((stat) => (
            <li className="text-center" key={stat.label}>
              <div className="text-4xl font-extrabold text-white capitalize">{stat.value}</div>
              <div className="mt-2 text-primary-100">{stat.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PlatformStats;
