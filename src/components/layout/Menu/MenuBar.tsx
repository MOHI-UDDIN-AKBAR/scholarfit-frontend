import { useAppDispatch } from '../../../store/hooks';
import { toggleSideBar } from '../../../store/slices/toggleSlice';
import Icon from '../../ui/Icon/Icon';

const MenuBar: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      aria-label="Toggle navigation menu"
      className="flex items-center justify-center w-12 h-10 rounded-md xl:hidden"
      onClick={() => dispatch(toggleSideBar())}
    >
      <Icon name="menu" size={16} className="text-primary-600" />
    </button>
  );
};

export default MenuBar;
