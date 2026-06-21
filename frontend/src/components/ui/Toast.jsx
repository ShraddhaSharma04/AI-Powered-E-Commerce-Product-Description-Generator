
function Toast({ message }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-800 p-3 rounded mb-4">
      {message}
    </div>
  );
}

export default Toast;