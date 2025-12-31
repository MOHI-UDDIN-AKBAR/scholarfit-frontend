import clsx from 'clsx';
import { useAppState } from '../../../store/hooks';
import Logo from '../../shared/Logo/Logo';
import MenuBar from '../Menu/MenuBar';
import Navigation from '../Navigation/Navigation';
import { shallowEqual } from 'react-redux';

const Sidebar: React.FC = () => {
  const { isOpen, isAuthenticated } = useAppState(
    (state) => ({
      isOpen: state.toggle.isOpen,
      isAuthenticated: Boolean(state.auth.accessToken),
    }),
    shallowEqual
  );

  return (
    <div
      className={clsx(
        'flex justify-between items-center w-fit max-xl:grow-0 xl:grow absolute z-10',
        isOpen ? 'max-xl:w-3/5 max-md:min-w-full ' : ''
      )}
    >
      <div className={isAuthenticated ? 'max-xl:hidden' : ''}>{<Logo />}</div>
      {isAuthenticated && (
        <>
          <MenuBar />
          <Navigation />
        </>
      )}
    </div>
  );
};

export default Sidebar;
