import { Link } from "react-router-dom";
import "animate.css";

const Blog = () => {
  return (
    <div className="flex justify-around items-center px-20 h-screen bg-background flex-wrap">
      <Link to="/blogtips" className="animate__animated animate__fadeInLeft">
        <img
          className="rounded-xl max-w-xs drop-shadow-2xl"
          src="https://cutewallpaper.org/21/code-wallpaper/Code-Brackets-Wallpaper-free-desktop-backgrounds-and-wallpapers.jpg"
          alt=""
        />
      </Link>

      <Link
        to="/blogexp"
        className="animate__animated animate__fadeInRight"
      >
        <img
          className="rounded-xl max-w-xs drop-shadow-xl"
          src="https://us.123rf.com/450wm/fizkes/fizkes1802/fizkes180200202/95238950-afro-am%C3%A9ricain-fatigu%C3%A9-homme-d-affaires-priv%C3%A9-de-sentiment-de-manque-de-sommeil-ayant-une-sieste-au-.jpg"
          alt=""
        />
      </Link>
    </div>
  );
};

export default Blog;
