import { strengthLifts } from '../progress-mock-data';

const StrengthTab: React.FC = () => {
  return (
    <div id="strength" className="tab-content">
      <div className="px-4 mt-8 sm:px-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-6 py-6 sm:px-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Strength Progress</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {strengthLifts.map((strength) => (
                <div key={strength.name} className="p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{strength.name}</h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${strength.color}-100 text-${strength.color}-800`}
                    >
                      {strength.changePercent}%
                    </span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">{strength.weight} kg</div>
                  <div className="mt-1 text-sm text-gray-500">
                    Personal Record: {strength.personalRecord}
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 text-xs text-gray-500">Progress this month</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 bg-${strength.color}-600 rounded-full`}
                        style={{ width: `${strength.progressMonth}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-900">Strength Progression Chart</h3>
              <div className="h-64">
                <canvas id="detailedStrengthChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrengthTab;
