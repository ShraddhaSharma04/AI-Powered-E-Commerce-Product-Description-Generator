function Card({ title, description }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}

export default Card;