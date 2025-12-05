import { NavLink } from 'react-router';

type NavItemProps = {
  item: { label: string; path: string };
  onClick: () => void;
};
const NavItem: React.FC<NavItemProps> = ({ item: { label, path }, onClick }) => {
  return (
    <li className="inline-flex items-center max-xl:w-full">
      <NavLink
        to={path}
        className={({ isActive }) =>
          [
            '"inline-flex items-center px-1 pt-1 text-base font-medium text-gray-500 capitalize border-b-2 border-transparent hover:cursor-pointer hover:text-gray-800 hover:border-b-gray-500 xl:text-lg max-xl:w-full max-xl:p-4 max-xl:pl-6"',
            isActive
              ? 'text-primary-500 border-b-primary-500 -translate-y-1 transition-transform duration-100 ease-linear'
              : 'text-gray-500',
          ].join(' ')
        }
        onClick={onClick}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
