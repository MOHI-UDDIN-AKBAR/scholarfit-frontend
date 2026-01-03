import { useActionState } from 'react';
import Button from '../../../ui/Button/Button';
import Search from '../../../ui/Search/Search';
import { searchFormAction } from '../../../../actions/exercise-action';
import { LoadingSpinner } from '../../../shared/LoadingSpinner/LoadingSpinner';

const SearchExercise: React.FC = () => {
  const [_, action, isPending] = useActionState(searchFormAction, null);

  return (
    <form
      action={action}
      className="grid items-center justify-center max-w-lg grid-cols-6 mx-auto mt-6 "
    >
      <Search containerClassName="col-span-4 h-full">
        {
          <input
            type="text"
            name="search-exercise"
            required={true}
            className="  block w-full pl-12! pr-12 py-2 text-sm md:text-base border-gray-300 rounded-r-none! border-r-0! focus:outline-none! focus:ring-0! focus:border! focus:border-blue-200!"
            placeholder="Search exercises..."
          />
        }
      </Search>
      <Button
        type="submit"
        className="grid items-center justify-center h-full col-span-2 px-3 text-sm font-medium text-white border-2 border-transparent rounded-r-md bg-primary-600 hover:bg-primary-700 focus:outline-none "
      >
        {isPending ? (
          <LoadingSpinner
            text="Searching..."
            showText={true}
            variant="white"
            size="sm"
            textClassName="text-white!"
          />
        ) : (
          'Search'
        )}
      </Button>
    </form>
  );
};

export default SearchExercise;
