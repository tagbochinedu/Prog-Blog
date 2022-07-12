import { useRef } from "react";
import { useAuth } from "../Context/AuthContext";

const EditComponent = (props) => {
  const titleRef = useRef();
  const postRef = useRef();
  
  const { updatepost } = useAuth();

 

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      await updatepost(
        props.location,
        props.uuid,
        titleRef.current.value,
        postRef.current.value
      );
      alert('editted successfully')
    } catch {}
  };
  return (
    <div>
      <form
        onSubmit={submitHandler}
        className="border-2 rounded border-txt my-4 p-2 mx-auto"
      >
        <div className="mt-6 min-h-1/4">
          <label className="text-txt text-lg font-semibold text-center block">
            TITLE
          </label>
          <input
            type="text"
            className="text-white bg-txt rounded-md font-semibold px-2 border-txt border-2 block w-full outline-none"
            placeholder="Enter new title here..."
            ref={titleRef}
          />
        </div>
        <div className="mt-6 min-h-1/4">
          <label className="text-txt text-lg font-semibold text-center block">
            POST
          </label>
          <textarea
            rows="4"
            className="text-white bg-txt p-2 rounded-lg border-txt border-2 block w-full rounded h-full outline-none"
            placeholder="Enter new post here..."
            ref={postRef}
          />
        </div>
        <button
          type="submit"
          className="rounded text-white px-4 py-2 font-semibold mt-4 bg-hdr"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default EditComponent;
