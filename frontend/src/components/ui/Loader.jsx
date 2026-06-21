
function Loader({ text = "Loading..." }) {
  return (
    <div className="p-4 text-center text-gray-700 font-semibold">
      {text}
    </div>
  );
}

export default Loader;