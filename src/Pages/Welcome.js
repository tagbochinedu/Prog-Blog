import { useState, useEffect } from "react";
import ProjectList from "../Components/ProjectList";
import Footer from "../Components/Footer";
import "../Components/Styling.css";
import { useAuth } from "../Context/AuthContext";

const Welcome = () => {
  const [projects, setProjects] = useState([]);
  const { list, imageList } = useAuth();

  const folder = "stackFolder";

  useEffect(() => {
    list(folder);
    const fetchProjects = async () => {
      try {
        const loadedProjects = [];
        const project = await fetch(
          "https://chinedu-website-blog-default-rtdb.firebaseio.com/project.json"
        );
        const projects = await project.json();

        for (const key in projects) {
          loadedProjects.push({
            id: key,
            title: projects[key].title,
            url: projects[key].url,
          });
        }
        setProjects(loadedProjects);
      } catch {}
    };
    fetchProjects();
  }, [list]);

  return (
    <>
      <div className="h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl  text-txt">Hi, I'm Chinedu</h1>
          <h4 className="text-6xl font-bold text-hdr">
            A Front-End Web Developer
          </h4>
        </div>
      </div>
      <div className="px-6 py-16 h-screen border-t-4 border-hdr">
        <h1 className=" text-center text-white mx-auto text-3xl font-bold style w-28">
          STACK
        </h1>
        <div className="h-full flex items-center justify-center">
          {" "}
          <ul className="flex justify-around items-center flex-wrap">
            {imageList.map((url) => {
              return (
                <div className="m-6" key={url.name}>
                  <img className="w-28" src={url.url} alt="stack" />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bg-txt py-16">
        <h1 className=" text-center text-white mx-auto text-3xl font-bold styling w-40">
          PROJECTS
        </h1>
        <div className="">
          <ul className="flex justify-around flex-wrap px-6">
            {projects.map((projects) => (
              <ProjectList
                key={projects.id}
                title={projects.title}
                url={projects.url}
              />
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
