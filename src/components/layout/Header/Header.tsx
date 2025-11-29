import Sidebar from '../Sidebar/Sidebar';

const Header: React.FC = () => {
  return (
    <header className=" bg-[hsl(var(--color-background))] dark:bg-[hsl(var(color-background))] sticky top-0 flex items-center justify-between px-4 lg:px-8 py-2 max-md:px-0 gap-2 xl:gap-6 z-10 h-18 shadow-[0_2px_0_rgba(0,0,0,0.1)] max-xl:h-16 max-sm:p-0">
      <Sidebar />
      <ul className=" flex gap-6  justify-center shrink items-center space-x-4  ">
        <li className="text-lg text-gray-700 hover:text-primary-600  hover:cursor-pointer px-2 py-1 max-lg:py-1 border-2 border-primary-700 rounded-md font-bold mx-auto">
          Sign in
        </li>
        <li className="hover:cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
          Get Started
        </li>
      </ul>
    </header>
  );
};

export default Header;
