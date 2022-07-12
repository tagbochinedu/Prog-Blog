import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../Context/AuthContext";

const Backdrop = () => {
  const { setProjectModal, list, imageList } = useAuth();
  return (
    <div
      className="h-screen backdrop-blur-lg top-0 bottom-0 w-full blur-3xl absolute z-20 bg-crbg"
      onClick={() => {
        setProjectModal(false);
      }}
    ></div>
  );
};

const ModalOverlay = () => {
  const { projectModalData, setProjectModal, projectModal, list, imageList } =
    useAuth();
  const [filteredData, setFilteredData] = useState("");
  const folder = "previewFolder";

  const filtered = imageList.filter((url) => {
    return url.name === projectModalData;
  });

  useEffect(() => {
    list(folder);
    console.log(filtered);
  }, [projectModal]);

  return (
    <>
      <div
        className="m-auto fixed w-full z-30  animate__animated animate__fadeIn"
        onClick={() => {
          setProjectModal(false);
        }}
      >
        {filtered.map((url) => {
          return (
            <video height="500" controls autoPlay className="w-full" key={url.name}>
              <source src={url.url} type="video/webm" />
            </video>
          );
        })}
      </div>
    </>
  );
};

const BlogModal = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default BlogModal;
