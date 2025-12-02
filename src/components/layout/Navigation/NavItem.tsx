import { Link } from 'react-router';

type NavItemProps = {
  item: { label: string; path: string };
};
const NavItem: React.FC<NavItemProps> = ({ item: { label, path } }) => {
  return (
    <li className="inline-flex items-center max-xl:w-full">
      <Link
        to={path}
        className="inline-flex items-center px-1 pt-1 text-base font-medium text-gray-500 capitalize border-b-2 border-transparent hover:cursor-pointer hover:text-gray-800 hover:border-b-gray-500 xl:text-lg max-xl:w-full max-xl:p-4 max-xl:pl-6"
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
