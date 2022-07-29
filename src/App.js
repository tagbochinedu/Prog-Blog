import { Route, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

import Welcome from "./Pages/Welcome";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Blog from "./Pages/Blog";
import Profile from "./Pages/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import BlogTips from "./Pages/BlogTips";
import BlogExperiences from "./Pages/BlogExperiences";
import MyExp from "./Pages/MyExp";
import JsTips from "./Pages/JsTips";
import Projects from "./Pages/Projects";

import Posts from "./Pages/Posts";
import Header from "./Components/Header";
import BlogModal from "./Components/BlogModal";

function App() {
  const { blogModal } = useAuth();

  return (
    <>
      {JSON.parse(localStorage.getItem("currentUser")) && <Header />}
      {blogModal && <BlogModal />}
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />

        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/profile" element={<Profile />}>
            <Route path="/profile/create-jstips-post" element={<JsTips />} />
            <Route path="/profile/create-myexp-post" element={<MyExp />} />
            <Route path="/profile/projects" element={<Projects />} />
            <Route path="/profile/posts" element={<Posts />} />
          </Route>
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/blogtips" element={<BlogTips />} />
          <Route exact path="/blogexp" element={<BlogExperiences />} />
          <Route exact path="/jstips" element={<BlogTips />} />
          <Route exact path="/myexperiences" element={<BlogExperiences />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
