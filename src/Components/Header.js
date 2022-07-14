import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import MenuOpen from "./Icons/MenuOpen";
import MenuClose from "./Icons/MenuClose";
import "animate.css";

const Header = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [menu, setMenu] = useState(false);
  const { currentUser, signout } = useAuth();

  const handleResize = () => {setWidth(window.innerWidth)}
  useEffect(()=>{
    window.addEventListener('resize', handleResize)
    if(width>767) {
      setMenu(false)
    }
  }, [width])
  const logOutHandler = () => {
    signout();
  };
  return (
    <header className="md:flex md:justify-between md:px-12 px-2 py-4 bg-background animate__animated animate__fadeInDown fixed top-0 right-0 z-10 left-0">
      <div className="md:w-4/12 flex justify-between">
        <Link
          className="text-xl font-bold font-serif text-hdr outline-8"
          to="/"
        >
          The Prog Blog
        </Link>
        <span
          className="md:hidden"
          onClick={() => {
            let width = window.innerWidth;
            console.log(width);
            setMenu(!menu);
          }}
        >
          {!menu ? <MenuOpen /> : <MenuClose />}
        </span>
      </div>

      <div className={`${currentUser ? "w-3/12" : "w-2/12"}`}>
        <ul
          className={`${"md:flex md:flex-row md:relative md:justify-between z-[-1] md:z-auto md:top-0 text-white md:text-center md:opacity-100 font-semibold w-full duration-500 ease-in transition-all"} ${
            menu ? "" : "hidden opacity-0"
          }`}
        >
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
            <li className="md:my-0 my-5">
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
