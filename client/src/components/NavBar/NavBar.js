import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = ({ ...props }) => {
  const { setShow, logout, loggedIn, user } = props;
  return (
    <div className="relative bg-white mb-4">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <div className="text-3xl strong inline-flex items-center font-medium">
              Office Queue
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink
              exact
              to="/"
              activeClassName="text-gray-900"
              className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 no-underline "
            >
              <span>Ticket</span>
            </NavLink>
            <NavLink
              to="/board"
              activeClassName="text-gray-900"
              className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 no-underline"
            >
              <span>Board</span>
            </NavLink>
            {loggedIn && user === (1 || 2) && (
              <NavLink
                to="/manage"
                activeClassName="text-gray-900"
                className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 no-underline"
              >
                <span>Manage</span>
              </NavLink>
            )}
            {loggedIn && user === 2 && (
              <NavLink
                to="stats"
                activeClassName="text-gray-900"
                className="text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 no-underline"
              >
                <span>Stats</span>
              </NavLink>
            )}
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {loggedIn ? (
              <Button onClick={() => logout()} variant="danger">
                Log Out
              </Button>
            ) : (
              <Button onClick={() => setShow(true)} variant="primary">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
