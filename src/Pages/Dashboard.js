import { useReducer, useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import image from "../Resources/dashboard-image.jpg";
import "animate.css";

const reducer = (state, action) => {
  if (action.type === "ACCORDION1") {
    return {
      acc1: !state.acc1,
      acc2: false,
      portfolio: false,
      projects: false,
      
      posts: false,
      jstips: false,
      myexp: false,
    };
  } else if (action.type === "ACCORDION2") {
    return {
      acc1: false,
      acc2: !state.acc2,
      portfolio: false,
      projects: false,
      stack: false,
      posts: false,
      jstips: false,
      myexp: false,
    };
  } else if (action.type === "JSTIPS") {
    return {
      acc1: true,
      acc2: false,
      portfolio: false,
      projects: false,
    
      posts: false,
      jstips: !state.jstips,
      myexp: false,
    };
  } else if (action.type === "POSTS") {
    return {
      acc1: false,
      acc2: false,
      portfolio: false,
      projects: false,
    
      posts: true,
      jstips: !state.jstips,
      myexp: false,
    };
  } else if (action.type === "MYEXP") {
    return {
      acc1: true,
      acc2: false,
      portfolio: false,
      projects: false,
     
      jstips: false,
      myexp: !state.myexp,
    };
  } else if (action.type === "PORTFOLIO") {
    return {
      acc1: false,
      acc2: false,
      portfolio: !state.portfolio,
      projects: false,
      
      posts: false,
      jstips: false,
      myexp: false,
      comments: false,
      likes: false,
    };
  } else if (action.type === "PROJECTS") {
    return {
      acc1: false,
      acc2: false,
      portfolio: true,
      projects: !state.projects,
      posts: false,
      jstips: false,
      myexp: false,
      comments: false,
      likes: false,
    };
  }
};

const Dashboard = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [menu, setMenu] = useState(false);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (width > 767) {
      setMenu(false);
    }
  }, [width]);

  const [state, dispatch] = useReducer(reducer, {
    acc1: false,
    acc2: false,
    posts: false,
    jstips: false,
    myexp: false,
    portfolio: false,
    projects: false,
  });

  const clickHandler1 = () => {
    dispatch({ type: "ACCORDION1" });
  };
  const clickHandler3 = () => {
    dispatch({ type: "POSTS" });
  };
  const clickHandler4 = () => {
    dispatch({ type: "PORTFOLIO" });
  };
  const accHandler1 = () => {
    dispatch({ type: "JSTIPS" });
  };
  const accHandler2 = () => {
    dispatch({ type: "MYEXP" });
  };
  const accHandler5 = () => {
    dispatch({ type: "PROJECTS" });
  };

  return (
    <>
      <div className='h-screen'>
        <div className={`${"md:w-1/4 z-10 left-0 w-2/12 top-14 bottom-0 shadow-md bg-background fixed border-r-txt md:border-r-2 animate__animated animate__fadeInLeft"} ${menu ? 'border-r-2 bottom-0' : ''}`}>
          <div className="pt-4 pb-2 px-6">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  src={image}
                  className={`${"rounded-full md:w-10 cursor-pointer md:cursor-auto"} ${menu? 'w-10' : 'w-6'}`}
                  alt="Avatar"
                  onClick={() => {
                    width<767 && setMenu(!menu);
                  }}
                />
              </div>
              <div
                className={`${"grow ml-3  md:block"} ${menu ? "animate__animated animate__fadeInLeft" : "hidden"}`}
              >
                <p className="text-sm font-semibold text-txt">
                  Tagbo Chinedu John
                </p>
              </div>
            </div>
          </div>
          <ul
            className={`${"md:relative z-[-1] md:z-auto md:block"} ${
              menu ? "animate__animated animate__fadeInLeft" : "hidden"
            }`}
          >
            <li className="relative accordion border-txt border-b-2  px-1">
              <p
                className={`${"text-xl font-bold flex items-center py-4 px-6 h-12 hover:text-hdr transition duration-300 ease-in-out cursor-pointer"} 
              ${state.acc1 ? "text-hdr" : "text-txt"}`}
                onClick={clickHandler1}
              >
                Create a Post
              </p>
              <ul
                className={`${"relative transition duration-1000 ease-linear"} ${
                  state.acc1 ? "h-auto" : "h-0"
                }`}
              >
                <li>
                  <Link
                    to="/profile/create-jstips-post"
                    className={`${"items-center text-sm py-4 pl-12 pr-6 h-6 hover:text-hdr transition duration-300 ease-in-out"} ${
                      state.acc1 ? "flex" : "hidden"
                    } ${state.jstips ? "text-hdr" : "text-txt"}`}
                    onClick={accHandler1}
                  >
                    Javascript Tips
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile/create-myexp-post"
                    className={`${"items-center text-sm py-4 pl-12 pr-6 h-6 hover:text-hdr transition duration-300 ease-in-out"} ${
                      state.acc1 ? "flex" : "hidden"
                    } ${state.myexp ? "text-hdr" : "text-txt"}`}
                    onClick={accHandler2}
                  >
                    My Experiences
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative accordion border-txt border-b-2  px-1">
              <Link
                to="/profile/posts"
                className={`${"text-xl font-bold flex items-center py-4 px-6 h-12 hover:text-hdr transition duration-300 ease-in-out cursor-pointer"} 
              ${state.posts ? "text-hdr" : "text-txt"}`}
                onClick={clickHandler3}
              >
                Posts
              </Link>
            </li>
            <li className="relative accordion border-txt border-b-2  px-1">
              <p
                className={`${"text-xl font-bold flex items-center py-4 px-6 h-12 hover:text-hdr transition duration-300 ease-in-out cursor-pointer"} 
              ${state.portfolio ? "text-hdr" : "text-txt"}`}
                onClick={clickHandler4}
              >
                Portfolio
              </p>
              <ul
                className={`${"relative transition duration-1000 ease-linear"} ${
                  state.portfolio ? "h-auto" : "h-0"
                }`}
              >
                <li>
                  <Link
                    to="/profile/projects"
                    className={`${"items-center text-sm py-4 pl-12 pr-6 h-6 hover:text-hdr transition duration-300 ease-in-out"} ${
                      state.portfolio ? "flex" : "hidden"
                    } ${state.projects ? "text-hdr" : "text-txt"}`}
                    onClick={accHandler5}
                  >
                    Projects
                  </Link>
                </li>
                
              </ul>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
