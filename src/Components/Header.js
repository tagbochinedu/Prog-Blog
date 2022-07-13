import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import MenuOpen from "./Icons/MenuOpen";
import MenuClose from "./Icons/MenuClose";
import "animate.css";

const Header = () => {
  const { currentUser, signout } = useAuth();
  const logOutHandler = () => {
    signout();
  };
  return (
    <header className="flex justify-between md:px-12 px-2 py-4 bg-background animate__animated animate__fadeInDown fixed top-0 right-0 z-10 left-0">
      <div className="w-4/12">
        <Link
          className="text-xl font-bold font-serif text-hdr outline-8"
          to="/"
        >
          The Prog Blog
        </Link>
      </div>

      <div>
        <ul
          className={`${"md:flex md:flex-row md:relative absolute -top-96 md:justify-between text-white md:text-center font-semibold"} ${
            currentUser ? "w-3/12" : "w-2/12"
          }`}
        >
          <span>
            <MenuOpen className="hidden" />
            <MenuClose />
          </span>
          {!currentUser && (
            <li>
              <NavLink
                end
                to="/signup"
                className="my-9 hover:text-hdr duration-500 "
              >
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
            <li className="my-5">
              <NavLink
                end
                to="/profile"
                className="hover:text-hdr duration-500"
              >
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
      </div>
    </header>
  );
};

export default Header;
