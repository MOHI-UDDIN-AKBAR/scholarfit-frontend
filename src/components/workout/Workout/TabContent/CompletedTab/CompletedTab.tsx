import { useGetCompletedSessionPrograms } from '../../../../../services/queries/session';
import { LoadingSpinner } from '../../../../shared/LoadingSpinner/LoadingSpinner';
import Icon from '../../../../ui/Icon/Icon';

const CompletedTab: React.FC = () => {
  const { data: completedPrograms, isLoading, isError, error } = useGetCompletedSessionPrograms();
  console.log(completedPrograms);
  if (isLoading) {
    return (
      <section className="px-4 mt-8 sm:px-0 h-60">
        <div className="grid h-full">
          <LoadingSpinner size="xl" variant="primary" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">
          {error?.message || 'Failed to load exercises'}
        </div>
      </section>
    );
  }

  if (!completedPrograms || completedPrograms.length === 0) {
    return (
      <section className="px-4 mt-8 h-60 sm:px-0">
        <div className="grid h-full place-items-center">No Programs Found found </div>
      </section>
    );
  }

  return (
    <section>
      <div className="px-4 sm:px-0">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Completed Programs</h3>
            <p className="mt-1 text-sm text-gray-500 xl:text-base">
              Programs you've successfully finished
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {completedPrograms.map((program) => (
              <li className="px-4 py-4 sm:px-6" key={program.programId}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-md shrink-0">
                      <Icon name="trophy" className="text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 xl:text-base">
                        {program.programName}
                      </div>
                      <div className="text-sm text-gray-500 xl:text-base">
                        Completed {program.completedAt} • {program.exerciseAmount} exercises
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs xl:text-sm font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CompletedTab;
