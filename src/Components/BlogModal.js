import ReactDOM from "react-dom";
import { useAuth } from "../Context/AuthContext";

const Backdrop = () => {
  const { setBlogModal } = useAuth();
  return (
    <div
      className="h-screen backdrop-blur-lg top-0 bottom-0 w-full blur-3xl absolute z-10 bg-crbg"
      onClick={() => {
        setBlogModal(false);
      }}
    ></div>
  );
};

const ModalOverlay = () => {
  const { modalData, setBlogModal } = useAuth();
  return (
    <>
      <div
        className="top-1/4 fixed w-full md:w-2/4 md:left-1/4 z-20 animate__animated animate__fadeInDown"
        onClick={() => {
          setBlogModal(false);
        }}
      >
        <div className="bg-txt py-2 text-2xl font-bold text-hdr rounded-t-lg text-center">
          <h1>{modalData.title}</h1>
        </div>
        <div className="bg-crbg text-justify px-2 py-6 border-4 border-txt text-txt font-semibold  rounded-b-lg">
          <p>{modalData.post}</p>
        </div>
      </div>
    </>
  );
};

const BlogModal = (props) => {
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
