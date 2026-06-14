import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <p className="text-gray-700 mb-6">
          This page will show product description history in future weeks.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            title="Total Descriptions"
            description="Generated description count will appear here."
          />

          <Card
            title="Saved Products"
            description="Saved product details will appear here."
          />

          <Card
            title="Available Tones"
            description="Premium, Traditional, and Health-Focused."
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;