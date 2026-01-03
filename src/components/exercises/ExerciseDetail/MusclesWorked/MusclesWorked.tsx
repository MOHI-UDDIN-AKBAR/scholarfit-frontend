type MusclesWorkedProps = { targetMuscles: string[]; secondaryMuscles: string[] };

const MusclesWorked: React.FC<MusclesWorkedProps> = ({ targetMuscles, secondaryMuscles }) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Muscles Worked</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-900">Primary Muscles</h3>
            <ul className="space-y-3">
              {targetMuscles.map((primaryMuscle) => (
                <li className="flex items-center" key={primaryMuscle}>
                  <div className="w-4 h-4 mr-3 bg-blue-500 rounded-full shrink-0"></div>
                  <span className="font-medium text-gray-900">{primaryMuscle}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-900">Secondary Muscles</h3>
            <ul className="space-y-3">
              {secondaryMuscles.map((secondaryMuscle) => (
                <li className="flex items-center" key={secondaryMuscle}>
                  <div className="w-4 h-4 mr-3 bg-green-500 rounded-full shrink-0"></div>
                  <span className="font-medium text-gray-900">{secondaryMuscle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusclesWorked;
