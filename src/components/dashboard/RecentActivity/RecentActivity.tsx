import type { IconName } from '../../ui/Icon';
import Icon from '../../ui/Icon/Icon';

export type RecentActivityItem = {
  title: string;
  icon: IconName;
  iconColor: string;
  bgColor: string;
  timeDescription: string;
  status: 'Completed' | 'Missed' | 'In Progress';
};

export const recentWorkoutActivity: RecentActivityItem[] = [
  {
    title: 'Upper Body A',
    icon: 'dumbbell',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    timeDescription: 'Today • 65 minutes • 8,400 kg volume',
    status: 'Completed',
  },
  {
    title: 'Lower Body B',
    icon: 'personRunning',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    timeDescription: 'Yesterday • 55 minutes • 7,200 kg volume',
    status: 'Completed',
  },
  {
    title: 'Cardio Session',
    icon: 'heartPulse',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
    timeDescription: '2 days ago • 30 minutes',
    status: 'Completed',
  },
];

const RecentActivity: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 xl:text-xl">Recent Activity</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {recentWorkoutActivity.map((workoutActivity) => (
          <li key={workoutActivity.title} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2  rounded-md shrink-0 ${workoutActivity.bgColor}`}>
                  <Icon
                    name={workoutActivity.icon}
                    className={`w-5 h-5 ${workoutActivity.iconColor}`}
                  ></Icon>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 xl:text-base">
                    {workoutActivity.title}
                  </div>
                  <div className="text-sm text-gray-500 xl:text-base">
                    {workoutActivity.timeDescription}
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-green-600 xl:text-base">
                {workoutActivity.status}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
