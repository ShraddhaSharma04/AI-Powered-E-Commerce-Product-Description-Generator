import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Modal } from "../components/ui";

function About() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About Project</h1>

        <p className="text-gray-700 mb-6">
          This project is built for food processing businesses like HimShakti.
          It helps them create professional product descriptions for platforms
          like Amazon, Flipkart, and other online marketplaces.
        </p>

        <Modal title="Project Goal">
          <p>
            The goal of this project is to save content-writing time and help
            businesses improve their product presentation using AI.
          </p>
        </Modal>
      </main>

      <Footer />
    </>
  );
}

export default About;