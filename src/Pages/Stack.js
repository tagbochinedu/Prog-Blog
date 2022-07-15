import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

const Stack = () => {
  const [preview, setPreview] = useState();
  const [disable, setDisable] = useState(true);
  const { uploader, list } = useAuth();
  const folder = "stackFolder";
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    list(folder);
    if (user.user === "johntagbo2@gmail.com") {
      setDisable(false);
    }
  }, [list]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      uploader(folder, preview);
    } catch {
      console.log("could not add to the list");
    }
  };

  return (
    <div className="md:w-3/4 w-full right-0 absolute bg-crbg border-t-2 md:px-10 px-4 pt-6 border-txt top-14 animate__animated animate__fadeInRight">
      <div className=" flex justify-center text-xl text-white font-bold">
        <h1>STACK</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="mt-6 mb-12 h-40">
          <div className="flex justify-between mb-2">
            <label className="text-txt text-lg font-semibold">STACK</label>
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
          disabled={disable}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Stack;
