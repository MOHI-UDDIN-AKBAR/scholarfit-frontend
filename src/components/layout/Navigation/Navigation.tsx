import clsx from 'clsx';
import { navItems } from '../../../config/navigation';
import Icon from '../../ui/Icon/Icon';
import Logo from '../../shared/Logo/Logo';
import NavItem from './NavItem';
import { useAppDispatch, useAppState } from '../../../store/hooks';
import { toggleSideBar } from '../../../store/slices/toggleSlice';

const Navigation: React.FC = () => {
  const isOpen = useAppState((state) => state.toggle.isOpen);
  const dispatch = useAppDispatch();
  return (
    <nav
      className={clsx(
        'shrink grow xl:ml-8 max-xl:min-h-dvh max-xl:absolute max-xl:top-0 z-50  max-xl:w-full bg-[hsl(var(--color-background))] dark:bg-[hsl(var(color-background))]',
        isOpen ? 'flex' : 'max-xl:hidden'
      )}
    >
      <ul className="flex items-center w-full gap-6 max-xl:flex-col max-xl:gap-2 2xl:gap-16">
        <li className="inline-flex items-center justify-between px-1 pt-1 text-base font-medium capitalize xl:text-lg max-xl:w-full max-xl:p-4 max-xl:pl-6 xl:hidden">
          <Logo />
          <Icon
            name="close"
            size={12}
            className="self-center border border-gray-300 rounded-full hover:cursor-pointer text-primary-600"
            onClick={() => dispatch(toggleSideBar())}
          />
        </li>
        {navItems.map((item) => (
          <NavItem item={item} key={item.label} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
