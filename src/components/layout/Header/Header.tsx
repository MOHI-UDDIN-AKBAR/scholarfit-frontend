import { Link, useNavigate } from 'react-router';
import Sidebar from '../Sidebar/Sidebar';
import Button from '../../ui/Button/Button';
import { useLogout } from '../../../services/mutations/auth';
import { useAppState } from '../../../store/hooks';

const Header: React.FC = () => {
  const isAuthenticated = useAppState((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();
  const { mutate: logoutMutation } = useLogout(navigate);

  return (
    <header className="bg-[hsl(var(--color-background))] dark:bg-[hsl(var(color-background))] sticky top-0 px-4 lg:px-8 py-2 max-md:px-0 shadow-[0_2px_0_rgba(0,0,0,0.1)] max-sm:p-0 h-18 max-xl:h-16 flex items-center z-100">
      <div className="relative grid justify-end w-full xl:items-center max-xl:mx-3">
        <Sidebar />
        {isAuthenticated ? (
          <ul className="relative z-0 grid grid-cols-2 max-xl:grid-cols-1 shrink">
            <li>
              <Button
                className="inline-flex items-center px-4 py-1 text-lg font-bold bg-white border-2 rounded-md text-primary-600 border-primary-600 hover:text-primary-700 focus:outline-none "
                onClick={() => logoutMutation()}
              >
                Logout
              </Button>
            </li>
          </ul>
        ) : (
          <ul className="relative z-0 grid grid-cols-2 max-xl:grid-cols-1 shrink">
            <li>
              <Link to="/login">
                <Button className="inline-flex items-center px-4 py-1 text-lg font-bold bg-white border-2 rounded-md text-primary-600 border-primary-600 hover:text-primary-700 focus:outline-none ">
                  Sign in
                </Button>
              </Link>
            </li>
            <li className="max-xl:hidden">
              <Link to="/register">
                <Button className="inline-flex items-center px-4 py-1 mr-2 text-lg font-medium text-white border-2 border-transparent rounded-md xl:mr-3 bg-primary-600 hover:bg-primary-700 focus:outline-none">
                  Get Started
                </Button>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
