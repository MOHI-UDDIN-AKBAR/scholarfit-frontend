import { useAppDispatch } from '../../../store/hooks';
import { updateExercisesQuery } from '../../../store/slices/exercisesSlice';
import type { PaginationDirection, PaginationMeta } from '../../../types/exercise';
import Button from '../../ui/Button/Button';
import clsx from 'clsx';

type PaginationProps = {
  isPlaceholderData: boolean;
  paginationMeta?: PaginationMeta;
  currentExerciseCount?: number;
};
const Pagination: React.FC<PaginationProps> = ({
  paginationMeta,
  isPlaceholderData,
  currentExerciseCount,
}) => {
  const dispatch = useAppDispatch();

  if (!paginationMeta) return null;
  const { total, hasNextPage, hasPreviousPage, nextCursor, previousCursor } = paginationMeta;

  const renderPaginationInfo = () =>
    currentExerciseCount ? (
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{currentExerciseCount}</span> exercises of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
    ) : null;

  const handlePaginationClick = (direction: PaginationDirection, cursor?: string) => {
    if (!cursor) return;
    dispatch(updateExercisesQuery({ paginationDirection: direction, cursor }));
  };

  return (
    <section className="px-4 mt-8 sm:px-0">
      <nav
        className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        {renderPaginationInfo()}
        <div className="flex justify-between flex-1 sm:justify-end">
          <Button
            onClick={() => handlePaginationClick('prev', previousCursor)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700  border border-gray-300 rounded-md ',
              isPlaceholderData || !hasPreviousPage
                ? 'hover:cursor-default! bg-gray-400'
                : 'hover:bg-primary-100 bg-white'
            )}
            disabled={isPlaceholderData || !hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePaginationClick('next', nextCursor)}
            className={clsx(
              'relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-md',
              isPlaceholderData || !hasNextPage
                ? 'hover:cursor-default! bg-gray-400'
                : 'hover:bg-primary-100 bg-white hover:cursor-pointer!'
            )}
            disabled={isPlaceholderData || !hasNextPage}
          >
            Next
          </Button>
        </div>
      </nav>
    </section>
  );
};

export default Pagination;
