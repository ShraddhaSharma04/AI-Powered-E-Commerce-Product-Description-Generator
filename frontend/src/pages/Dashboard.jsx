import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Dashboard() {
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/descriptions")
      .then((res) => res.json())
      .then((data) => {
        setDescriptions(data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch descriptions from backend.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <p className="text-gray-700 mb-6">
          This dashboard displays product description data coming from the backend API.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card
            title="Total Descriptions"
            description={`${descriptions.length} descriptions available`}
          />

          <Card
            title="Saved Products"
            description="Product data is fetched from Express backend."
          />

          <Card
            title="Available Tones"
            description="Premium, Traditional, and Health-Focused."
          />
        </div>

        {loading && (
          <p className="text-green-700 font-semibold">Loading data...</p>
        )}

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded">{error}</p>
        )}

        {!loading && !error && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">
              Recent Product Descriptions
            </h2>

            <div className="space-y-4">
              {descriptions.map((item) => (
                <div key={item.id} className="border p-4 rounded">
                  <h3 className="font-bold text-lg">{item.productName}</h3>
                  <p className="text-gray-600">Tone: {item.tone}</p>
                  <p className="text-gray-700 mt-2">{item.description}</p>
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