import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState("");
  const [updatedTone, setUpdatedTone] = useState("Premium");

  async function fetchDescriptions() {
    try {
      const response = await fetch("http://localhost:5000/api/descriptions");
      const data = await response.json();
      setDescriptions(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Failed to fetch descriptions.");
    }
  }

  useEffect(() => {
    fetchDescriptions();
  }, []);

  async function deleteDescription(id) {
    await fetch(`http://localhost:5000/api/descriptions/${id}`, {
      method: "DELETE",
    });

    setMessage("Description deleted successfully.");
    fetchDescriptions();
  }

  async function updateDescription(id) {
    await fetch(`http://localhost:5000/api/descriptions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tone: updatedTone,
      }),
    });

    setMessage("Description updated successfully.");
    setEditingId("");
    fetchDescriptions();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <p className="text-gray-700 mb-6">
          Product descriptions are fetched from MongoDB through the Express API.
        </p>

        {message && (
          <p className="bg-green-100 text-green-800 p-3 rounded mb-4">
            {message}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card
            title="Total Descriptions"
            description={`${descriptions.length} descriptions saved`}
          />

          <Card title="Database" description="MongoDB Atlas connected" />

          <Card title="API Status" description="CRUD operations active" />
        </div>

        {loading && <p>Loading descriptions...</p>}

        {!loading && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">
              Saved Product Descriptions
            </h2>

            <div className="space-y-4">
              {descriptions.map((item) => (
                <div key={item._id} className="border p-4 rounded">
                  <h3 className="font-bold text-lg">{item.productName}</h3>
                  <p className="text-gray-600">Tone: {item.tone}</p>
                  <p className="text-gray-600">Weight: {item.weight}</p>
                  <p className="text-gray-700 mt-2">{item.description}</p>

                  {editingId === item._id ? (
                    <div className="mt-4">
                      <select
                        value={updatedTone}
                        onChange={(e) => setUpdatedTone(e.target.value)}
                        className="border p-2 rounded mr-2"
                      >
                        <option>Premium</option>
                        <option>Traditional</option>
                        <option>Health-Focused</option>
                      </select>

                      <button
                        onClick={() => updateDescription(item._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded mr-2 cursor-pointer hover:bg-blue-700 active:scale-95 transition"
                      >
                        Save Update
                      </button>

                      <button
                        onClick={() => setEditingId("")}
                        className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 active:scale-95 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          setEditingId(item._id);
                          setUpdatedTone(item.tone);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 cursor-pointer hover:bg-yellow-600 active:scale-95 transition"
                      >
                        Edit Tone
                      </button>

                      <button
                        onClick={() => deleteDescription(item._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700 active:scale-95 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;