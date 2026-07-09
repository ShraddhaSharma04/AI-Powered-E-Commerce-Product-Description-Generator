import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="hero-label">AI FOR E-COMMERCE CONTENT</p>

        <h1>
          Turn Product Details
          <span> Into Powerful Descriptions.</span>
        </h1>

        <p className="hero-description">
          Create professional, keyword-rich product descriptions that inform
          customers, improve listings, and support online sales.
        </p>

        <div className="hero-actions">
          <Link to="/generator" className="primary-button">
            Create Description
          </Link>

          <Link to="/dashboard" className="secondary-button">
            Explore Products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;