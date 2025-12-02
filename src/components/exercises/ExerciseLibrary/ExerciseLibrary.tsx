import Pagination from '../../sections/Pagination/Pagination';
import ExerciseGrid from '../ExerciseGrid/ExerciseGrid';
import ExerciseCategories from './ExerciseCategories/ExerciseCategories';
import Header from './Header/Header';
import SearchExercise from './SearchExercise/SearchExercise';

const ExerciseLibrary: React.FC = () => {
  return (
    <section className="max-w-full py-6 mx-auto sm:px-6 lg:px-8">
      {/* <!-- Header --> */}
      <div className="px-4 sm:px-0">
        <Header />

        {/* <!-- Search --> */}
        <SearchExercise />

        {/* <!-- ExerciseCategories --> */}
        <ExerciseCategories />
      </div>

      {/* <!-- Exercise Grid --> */}
      <ExerciseGrid />

      {/* <!-- Pagination --> */}
      <Pagination />
    </section>
  );
};

export default ExerciseLibrary;
