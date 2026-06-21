
function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800"
    >
      {children}
    </button>
  );
}

export default Button;