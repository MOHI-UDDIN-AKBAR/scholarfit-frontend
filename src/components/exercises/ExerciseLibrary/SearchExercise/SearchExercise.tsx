import Icon from '../../../../components/ui/Icon/Icon';
import InputField from '../../../../components/ui/Input/InputField';

const SearchExercise: React.FC = () => {
  return (
    <section className="max-w-lg mx-auto mt-6 ">
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon name="search" className="text-gray-400 "></Icon>
        </div>
        <InputField
          type="text"
          name="search"
          inputClassName="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12! pr-12 py-2 text-sm md:text-base border-gray-300 rounded-md"
          placeholder="Search exercises..."
        />
      </div>
    </section>
  );
};

export default SearchExercise;
