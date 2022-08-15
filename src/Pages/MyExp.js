import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const MyExp = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const { createpost } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const location = "myexp";
    try {
      await createpost(location, title, post);
      setTitle("");
      setPost("");
      alert("Post uploaded");
    } catch {
      console.log("could not create post");
    }
  };

  return (
    <div className="md:w-3/4 w-10/12 right-0 absolute bg-crbg  border-t-2 md:px-10 px-4 pt-6 border-txt h-full top-14 animate__animated animate__fadeInRight">
      <div className=" flex justify-center text-xl text-white font-bold">
        <h1>MY EXPERIENCES</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="">
          <label className="text-txt text-lg font-semibold">TITLE</label>
          <input
            type="text"
            className="text-white bg-txt rounded-md font-semibold px-2 border-txt border-2 block w-full outline-none"
            placeholder="Post Title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mt-6 min-h-1/4">
          <label className="text-txt text-lg font-semibold">
            CREATE POST HERE
          </label>
          <textarea
            rows="10"
            className="text-white bg-txt p-2 rounded-lg border-txt border-2 block w-full rounded h-full outline-none"
            placeholder="Type Here..."
            required
            value={post}
            onChange={(e) => {
              setPost(e.target.value);
            }}
          />
        </div>
        <button
          className="rounded text-white px-4 py-2 font-semibold w-full mt-4 bg-hdr"
          type="submit"
        >
          POST
        </button>
      </form>
    </div>
  );
};

export default MyExp;
