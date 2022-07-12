const Image = (props) => {
  return (
    <>
      {props.image.map((img) => {
        return (
          <img className="rounded-t-lg" key={img.name} src={img.url} alt="" />
        );
      })}
    </>
  );
};
export default Image