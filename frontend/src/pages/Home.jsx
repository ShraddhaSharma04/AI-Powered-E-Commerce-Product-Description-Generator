import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <main className="home-page">
        <section className="features-section">
          <p className="section-label">CORE FEATURES</p>

          <h2>Everything Needed for Product Description Creation</h2>

          <p className="section-description">
            AI ProductGen helps food-processing businesses create clean,
            professional, and useful product descriptions for e-commerce
            platforms.
          </p>

          <div className="features-grid">
            <Card
              title="Product Input Form"
              description="Users can enter product name, ingredients, weight, and key features."
            />

            <Card
              title="Tone Selector"
              description="Choose Premium, Traditional, or Health-Focused tone for each product."
            />

            <Card
              title="Description Generator"
              description="Generate a professional product description and save it in MongoDB."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;