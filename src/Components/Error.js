const Error = (props) => {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        role="alert"
      >
        <h3>{props.text}</h3>
      </div>
    );
  };
  
  export default Error