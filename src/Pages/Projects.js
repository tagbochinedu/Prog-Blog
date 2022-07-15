import { useRef, useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const Projects = () => {
  const titleRef = useRef();
  const urlRef = useRef();
  const [preview, setPreview] = useState();
  const [disable, setDisable] = useState(true);
  const { uploader } = useAuth();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user.user === "johntagbo2@gmail.com") {
      setDisable(false);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user.user !== "johntagbo2@gmail.com") {
      return alert(
        "Only the creator of this blog can add a project to the portfolio"
      );
    }
    const project = {
      title: titleRef.current.value,
      url: urlRef.current.value,
    };
    const folder = "previewFolder";

    try {
      const response = await fetch(
        "https://chinedu-website-blog-default-rtdb.firebaseio.com/project.json",
        {
          method: "POST",
          body: JSON.stringify(project),
          headers: { "Content-Type": "application/json" },
        }
      );
      uploader(folder, preview);
      await response.json();
    } catch {
      console.log("could not create project");
    }
  };

  return (
    <div className="md:w-3/4 w-full right-0 absolute bg-crbg  border-t-2 md:px-10 px-4 pt-6 border-txt top-14 h-full animate__animated animate__fadeInRight">
      <div className=" flex justify-center text-xl text-white font-bold">
        <h1>PROJECTS</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="">
          <label className="text-txt text-lg font-semibold">
            PROJECT TITLE
          </label>
          <input
            type="text"
            className="text-white bg-txt rounded-md font-semibold px-2 border-txt border-2 block w-full outline-none"
            ref={titleRef}
            placeholder="Project Title"
            required
          />
        </div>
        <div className="mt-6 min-h-1/4">
          <label className="text-txt text-lg font-semibold">PROJECT URL</label>
          <input
            type="url"
            className="text-white bg-txt rounded-md font-semibold px-2 border-txt border-2 block w-full outline-none"
            ref={urlRef}
            placeholder="Project URL"
            required
          />
        </div>
        <div className="mt-6 mb-12 h-40">
          <div className="flex justify-between mb-2">
            <label className="text-txt text-lg font-semibold">
              PROJECT PREVIEW
            </label>
            <button
              type="reset"
              className="rounded text-white px-4 py font-semibold bg-hdr"
            >
              Clear
            </button>
          </div>
          <div className="flex justify-center items-center h-full border-txt border-4 rounded border-dashed">
            <input
              type="file"
              className="text-white rounded-md font-semibold px-2 block outline-none "
              onChange={(e) => {
                setPreview(e.target.files[0]);
              }}
              placeholder="Project Preview"
              required
            />
          </div>
        </div>
        <button
          className={`${"rounded text-white px-4 py-2 font-semibold w-full"} ${
            disable ? "bg-txt" : "bg-hdr"
          }`}
          type="submit"
          required
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Projects;
