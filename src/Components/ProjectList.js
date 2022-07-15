import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { images } from "../Resources/CardImages";
import Image from "./Image";
import Video from "./Video";
const ProjectList = (props) => {
  const { list, imageList } = useAuth();
  const [card, setCard] = useState(false);
  const folder = "previewFolder";

  const image = images.filter((img) => {
    return img.name === props.title;
  });
  const filtered = imageList.filter((url) => {
    return url.name === props.title;
  });

  const clickHandler = () => {
    list(folder);
    setCard(!card);
    console.log(filtered);
  };
  return (
    <>
      <div className="rounded-lg drop-shadow-2xl bg-crbg text-white max-w-xs my-4 mx-4">
        <div className="w-80" onClick={clickHandler}>
          {!card ? <Image image={image} /> : <Video filtered={filtered} />}
        </div>
        <div className="p-6 text-center font-semibold">
          <a href={props.url}>{props.title.toUpperCase()}</a>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
