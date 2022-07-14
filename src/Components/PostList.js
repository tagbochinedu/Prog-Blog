import EditComponent from "./EditComponent";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

const PostList = (props) => {
  const { deletepost, currentUser } = useAuth();
  const [location, setLocation] = useState(
    props.location === "jstips" ? "jstips" : "myexp"
  );
  const [uuid, setUuid] = useState(props.uuid);
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(
    currentUser.email !== "johntagbo2@gmail.com" ? true : false
  );

  const deleteHandler = async () => {
    if (disabled) {
      console.log(currentUser.email);
      setDisabled(disabled);
      return alert("Only the creator of this blog can delete posts");
    }
    try {
      await deletepost(location, uuid);
      console.log(location, uuid);
      alert("deleted successfully");
    } catch {
      alert("could not delete");
    }
  };

  return (
    <div className=" border-txt border-2 rounded p-2 my-2 animate__animated animate__fadeInDown">
      <div className="md:flex md:justify-between md:items-center">
        <div>
          <h1 className="font-semibold bg-txt p-2 rounded">
            {props.title.toUpperCase()}
          </h1>
        </div>
        <div className="mt-2 flex justify-between md:block">
          <button
            type="button"
            className="bg-hdr rounded p-2 font-semibold md:mx-2 w-5/12 md:w-auto"
            onClick={() => {
              setEdit(!edit);
              setUuid(uuid);
              setLocation(location);
            }}
          >
            EDIT
          </button>
          <button
            type="button"
            className={`${" rounded p-2 font-semibold w-5/12 md:w-auto"} ${
              disabled ? "bg-txt" : "bg-hdr"
            }`}
            onClick={deleteHandler}
          >
            DELETE
          </button>
        </div>
      </div>
      {edit && <EditComponent uuid={uuid} location={location} />}
    </div>
  );
};

export default PostList;
