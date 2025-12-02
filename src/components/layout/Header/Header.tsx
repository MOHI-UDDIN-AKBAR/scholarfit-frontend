import Sidebar from '../Sidebar/Sidebar';

const Header: React.FC = () => {
  return (
    <header className="bg-[hsl(var(--color-background))] dark:bg-[hsl(var(color-background))] sticky top-0 px-4 lg:px-8 py-2 max-md:px-0 shadow-[0_2px_0_rgba(0,0,0,0.1)] max-sm:p-0 h-18 max-xl:h-16 flex items-center">
      <div className="relative grid justify-end w-full xl:items-center">
        <Sidebar />
        <ul className="relative z-0 grid grid-cols-2 gap-6 mr-2 shrink xl:mr-3">
          <li className="px-4 py-1 text-lg font-bold text-center text-gray-700 border-2 rounded-md lg:px-6 w-fit hover:text-primary-600 hover:cursor-pointer border-primary-700">
            Sign in
          </li>
          <li className="grid w-full px-4 py-1 text-base font-medium text-center text-white border border-transparent rounded-md shadow-sm lg:px-6 hover:cursor-pointer bg-primary-600 hover:bg-primary-700 place-items-center">
            Get Started
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
