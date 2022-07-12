import {Carousel} from "reactjs-infinite-carousel";

const StackList = (props) => {
  return (
    <div>
      <Carousel images={props.url} key={props.name} />
    </div>
  );
};
export default StackList;
