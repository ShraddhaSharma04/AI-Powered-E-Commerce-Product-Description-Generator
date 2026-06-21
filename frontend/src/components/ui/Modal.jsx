
function Modal({ title, children }) {
  return (
    <div className="border p-5 rounded bg-white shadow mb-4">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default Modal;