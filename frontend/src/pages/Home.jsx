import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Core Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card
            title="Product Input Form"
            description="Users can enter product name, ingredients, weight, and key features."
          />

          <Card
            title="Tone Selector"
            description="Users can choose Premium, Traditional, or Health-Focused tone."
          />

          <Card
            title="AI Description"
            description="The app will generate keyword-rich descriptions using Gemini API."
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;