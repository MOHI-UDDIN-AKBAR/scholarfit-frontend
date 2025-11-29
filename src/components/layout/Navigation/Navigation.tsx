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
        ' shrink grow lg:ml-8   max-lg:min-h-dvh max-lg:absolute max-lg:top-0 z-50 bg-[hsl(var(--color-background))] dark:bg-[hsl(var(color-background))] max-lg:w-full',
        isOpen ? 'flex' : 'max-lg:hidden'
      )}
    >
      <ul className="flex max-lg:flex-col gap-6 max-lg:gap-2 2xl:gap-16 items-center w-full">
        <li className="inline-flex items-center px-1 pt-1  text-base xl:text-lg font-medium capitalize   max-lg:w-full max-lg:p-4 max-lg:pl-6 lg:hidden justify-between">
          <Logo />
          <Icon
            name="close"
            size={12}
            className="border border-gray-300 rounded-full hover:cursor-pointer text-primary-600 self-center"
            onClick={() => dispatch(toggleSideBar())}
          />
        </li>
        {navItems.map((item) => (
          <NavItem label={item.label} key={item.label} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
