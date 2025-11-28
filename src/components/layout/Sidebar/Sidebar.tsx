import clsx from 'clsx';
import { useAppState } from '../../../store/hooks';
import Logo from '../../shared/Logo/Logo';
import MenuBar from '../Menu/MenuBar';
import Navigation from '../Navigation/Navigation';

const Sidebar: React.FC = () => {
  const isOpen = useAppState((state) => state.toggle.isOpen);

  return (
    <div
      className={clsx(
        'flex justify-between items-center  w-fit  max-lg:grow-0 lg:grow  relative ',
        isOpen ? 'max-lg:w-3/5  max-md:min-w-full ' : ''
      )}
    >
      <div className="max-lg:hidden">{<Logo />}</div>
      {<MenuBar />}
      <Navigation />
    </div>
  );
};

export default Sidebar;
