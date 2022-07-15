import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import MenuOpen from "./Icons/MenuOpen";
import MenuClose from "./Icons/MenuClose";
import "animate.css";

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(false);
  const { signout, setIsLogged } = useAuth();

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (width > 767) {
      setMenu(false);
    }
  }, [width]);
  const logOutHandler = () => {
    signout();
  };
  return (
    <header className="md:flex md:justify-between md:px-12 px-2 py-4 bg-background animate__animated animate__fadeInDown fixed top-0 right-0 z-20 left-0">
      <div className="md:w-4/12 flex justify-between">
        <Link
          className="text-xl font-bold font-serif text-hdr outline-8"
          to="/"
          onClick={() => {
            setMenu(false);
          }}
        >
          The Prog Blog
        </Link>
        <span
          className="md:hidden"
          onClick={() => {
            setMenu(!menu);
          }}
        >
          {!menu ? <MenuOpen /> : <MenuClose />}
        </span>
      </div>

      <div className="w-3/12">
        <ul
          className={`${"md:flex md:flex-row md:relative md:justify-between z-[-1] md:z-auto md:top-0 text-white md:text-center md:opacity-100 font-semibold w-full duration-500 ease-in transition-all"} ${
            menu ? "" : "hidden opacity-0"
          }`}
        >
          {!JSON.parse(localStorage.getItem('currentUser')) && (
            <li>
              <NavLink
                end
                to="/signup"
                className="my-9 hover:text-hdr duration-500 "
                onClick={() => {
                  setMenu(false);
                }}
              >
                Sign Up
              </NavLink>
            </li>
          )}
          {!JSON.parse(localStorage.getItem('currentUser')) && (
            <li>
              <NavLink
                end
                to="/signin"
                className="hover:text-hdr duration-500"
                onClick={() => {
                  setMenu(false);
                }}
              >
                Sign In
              </NavLink>
            </li>
          )}
          {JSON.parse(localStorage.getItem('currentUser')) && (
            <li>
              <NavLink
                end
                to="/blog"
                className="hover:text-hdr duration-500"
                onClick={() => {
                  setMenu(false);
                }}
              >
                Blog
              </NavLink>
            </li>
          )}
          {JSON.parse(localStorage.getItem('currentUser')) && (
            <li className="md:my-0 my-5">
              <NavLink
                onClick={() => {
                  setMenu(false);
                }}
                end
                to="/profile"
                className="hover:text-hdr duration-500"
              >
                Profile
              </NavLink>
            </li>
          )}
          {JSON.parse(localStorage.getItem('currentUser')) && (
            <li>
              <NavLink
                end
                to="/signin"
                className="hover:text-hdr duration-500"
                onClick={() => {
                  setMenu(false);
                  logOutHandler()
                  setIsLogged(false);
                }}
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
