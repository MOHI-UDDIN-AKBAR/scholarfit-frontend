import { useAppDispatch } from '../../../store/hooks';
import { toggleSideBar } from '../../../store/slices/toggleSlice';
import Icon from '../../ui/Icon/Icon';

const MenuBar: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <button
      aria-label="Toggle navigation menu"
      className="flex h-10 w-12 items-center justify-center rounded-md lg:hidden"
      onClick={() => dispatch(toggleSideBar())}
    >
      <Icon name="menu" size={16} className="text-primary-600" />
    </button>
  );
};

export default MenuBar;
