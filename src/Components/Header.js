import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "animate.css";

const Header = () => {
  const { currentUser, signout } = useAuth();
  const logOutHandler = () => {
    signout();
  };
  return (
    <header className="flex justify-between px-12 py-4 bg-background animate__animated animate__fadeInDown fixed top-0 right-0 z-10 left-0">
      <div className="w-4/12">
        <Link
          className="text-xl font-bold font-serif text-hdr outline-8"
          to="/"
        >
          The Prog Blog
        </Link>
      </div>
      <ul
        className={`${"flex flex-row justify-between text-white font-semibold"} ${
          currentUser ? "w-3/12" : "w-2/12"
        }`}
      >
        {!currentUser && (
          <li>
            <NavLink end to="/signup" className="hover:text-hdr duration-500">
              Sign Up
            </NavLink>
          </li>
        )}
        {!currentUser && (
          <li>
            <NavLink end to="/signin" className="hover:text-hdr duration-500">
              Sign In
            </NavLink>
          </li>
        )}
        {currentUser && (
          <li>
            <NavLink end to="/blog" className="hover:text-hdr duration-500">
              Blog
            </NavLink>
          </li>
        )}
        {currentUser && (
          <li>
            <NavLink end to="/profile" className="hover:text-hdr duration-500">
              Profile
            </NavLink>
          </li>
        )}
        {currentUser && (
          <li>
            <NavLink
              end
              to="/signin"
              className="hover:text-hdr duration-500"
              onClick={logOutHandler}
            >
              Log Out
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
