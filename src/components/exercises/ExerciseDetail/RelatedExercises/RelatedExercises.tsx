import { Link } from 'react-router';
import { exerciseIcons, singleExercise } from '../../exercise-mock-data';
import Icon from '../../../ui/Icon/Icon';
import clsx from 'clsx';

const RelatedExercises: React.FC = () => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-6 py-6 sm:px-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Related Exercises</h2>
        <div className="space-y-4">
          {[singleExercise, singleExercise, singleExercise, singleExercise].map(
            (relatedExercise) => (
              <Link
                to={`/exercises/${relatedExercise.exerciseId}`}
                className="flex items-center p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
                key={relatedExercise.exerciseId}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-md shrink-0">
                  <Icon
                    name={exerciseIcons[relatedExercise.exerciseType].icon}
                    className={exerciseIcons[relatedExercise.exerciseType].iconStyle}
                  ></Icon>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-900">{relatedExercise.name}</div>
                  {relatedExercise.keywords[0] && (
                    <div className="text-base text-gray-500">{relatedExercise.keywords[0]}</div>
                  )}
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedExercises;
