import { Link } from 'react-router';
import Icon from '../../ui/Icon/Icon';

const Logo: React.FC = () => {
  return (
    <Link
      to="/"
      className="flex items-center justify-center gap-2 flex-nowrap shrink-0 hover:cursor-pointer"
    >
      <div className="flex items-center justify-center w-12 h-10">
        <Icon
          name="dumbbell"
          className="text-primary-600 lg:-translate-y-1.2 -translate-y-1 self-center h-10 w-12 max-lg:h-8 max-lg:w-10"
        />
      </div>
      <span className="text-xl font-bold text-gray-900 ">ScholarFit</span>
    </Link>
  );
};

export default Logo;
