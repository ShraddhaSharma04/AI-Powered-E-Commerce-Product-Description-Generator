import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="standard-page">
        <section className="page-intro">
          <p className="section-label">ABOUT THE PROJECT</p>
          <h1>Helping Food Businesses Create Better Online Listings</h1>
          <p>
            AI ProductGen is a full-stack web application created for food
            processing businesses that need professional e-commerce product
            descriptions.
          </p>
        </section>

        <section className="about-grid">
          <article className="about-card">
            <h2>The Problem</h2>
            <p>
              Small businesses often have high-quality products but lack the
              time and writing support required to create effective online
              product listings.
            </p>
          </article>

          <article className="about-card">
            <h2>The Solution</h2>
            <p>
              The application converts product details such as ingredients,
              weight, features, and tone into structured e-commerce content.
            </p>
          </article>

          <article className="about-card">
            <h2>Technology</h2>
            <p>
              The project uses React, Node.js, Express.js, MongoDB Atlas,
              Mongoose, Tailwind CSS, and Gemini API integration.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;