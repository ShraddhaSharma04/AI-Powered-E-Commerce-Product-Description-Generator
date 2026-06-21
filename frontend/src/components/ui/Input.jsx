
function Input({ label, placeholder, type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full border p-3 rounded"
      />
    </div>
  );
}

export default Input;