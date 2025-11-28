type NavItemProps = {
  label: string;
};
const NavItem: React.FC<NavItemProps> = ({ label }) => {
  return (
    <li className="border-transparent text-gray-500  hover:cursor-pointer hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 hover:border-b-gray-500 text-base xl:text-lg font-medium capitalize  max-lg:w-full max-lg:p-4 max-lg:pl-6">
      {label}
    </li>
  );
};

export default NavItem;
