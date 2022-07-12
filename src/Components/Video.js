const Video = (props) => {
  return (
    <>
      {props.filtered.map((url) => {
        return (
          <video autoPlay className="w-full h-full" key={url.name}>
            <source src={url.url} type="video/webm" />
          </video>
        );
      })}
    </>
  );
};
export default Video;
