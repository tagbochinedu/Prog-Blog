

import { images } from "../Resources/CardImages";
import Image from "./Image";

const ProjectList = (props) => {
  

  const image = images.filter((img) => {
    return img.name === props.title;
  });
  

  
  return (
    <>
      <div className="rounded-lg drop-shadow-2xl bg-crbg text-white max-w-xs my-4 mx-4">
        <div className="w-80">
        <Image image={image} />
        </div>
        <div className="p-6 text-center font-semibold">
          <a href={props.url}>{props.title.toUpperCase()}</a>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
