import { useAuth } from "../Context/AuthContext";

const BlogPosts = (props) => {
  const { setModalData, setBlogModal } = useAuth();

  const clickHandler = () => {
    const blog = { title: props.title.toUpperCase(), post: props.post };
    setBlogModal(true);
    setModalData(blog);
  };
  return (
    <>
      <div className="text-white p-4 my-10 rounded-lg bg-txt shadow-lg border-2 border-txt md:flex md:justify-between md:items-center animate__animated animate__fadeInLeft">
        <div>
          <h1 className="font-semibold text-xl px-2 py-4 bg-crbg text-center rounded-lg md:text-left md:rounded-3xl my-2">
            {props.title.toUpperCase()}
          </h1>
        </div>
        <div>
          <button
            type="button"
            className="rounded-lg p-2 font-semibold bg-hdr w-full my-2"
            onClick={clickHandler}
          >
            READ
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogPosts;
