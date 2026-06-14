import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About Project</h1>

        <p className="text-gray-700">
          This project is built for food processing businesses like HimShakti.
          It helps them create professional product descriptions for platforms
          like Amazon, Flipkart, and other online marketplaces.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default About;