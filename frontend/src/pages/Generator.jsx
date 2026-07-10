import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const initialForm = {
  productName: "",
  ingredients: "",
  weight: "",
  features: "",
  tone: "Premium",
};

function Generator() {
  const [formData, setFormData] = useState(initialForm);
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function createDescriptionText() {
    const toneOpening = {
      Premium: "Discover the premium quality of",
      Traditional: "Experience the authentic homemade taste of",
      "Health-Focused": "Enjoy a wholesome and health-conscious choice with",
    };

    return `${toneOpening[formData.tone]} ${
      formData.productName
    }, carefully prepared using ${
      formData.ingredients
    }. This ${formData.weight} product offers ${
      formData.features
    }, making it an excellent choice for customers looking for quality and flavour.`;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.productName.trim() ||
      !formData.ingredients.trim() ||
      !formData.weight.trim() ||
      !formData.features.trim()
    ) {
      setError("Please complete all product fields.");
      return;
    }

    const descriptionText = createDescriptionText();

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/descriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            description: descriptionText,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save description.");
      }

      setGeneratedDescription(data.data.description);
      setMessage("Description created and saved in MongoDB successfully.");
      setFormData(initialForm);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="generator-page">
        <section className="generator-heading">
          <p className="section-label">AI CONTENT GENERATOR</p>
          <h1>Create a Product Description</h1>
          <p>
            Enter your product information and save a professional description
            directly to MongoDB.
          </p>
        </section>

        <section className="generator-layout">
          <form className="generator-form-card" onSubmit={handleSubmit}>
            <div className="form-title">
              <span>01</span>
              <div>
                <h2>Product Information</h2>
                <p>Complete the details below.</p>
              </div>
            </div>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="productName">Product Name</label>
                <input
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Example: Himalayan Apple Jam"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Apple, sugar, lemon juice"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Example: 300g"
                />
              </div>

              <div className="form-group">
                <label htmlFor="tone">Description Tone</label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                >
                  <option value="Premium">Premium</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Health-Focused">Health-Focused</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="features">Key Features</label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Natural, handmade, preservative-free"
                  rows="4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={saving}
            >
              {saving ? "Saving Description..." : "Create and Save Description"}
            </button>
          </form>

          <aside className="description-preview">
            <div className="preview-number">02</div>

            <h2>Description Preview</h2>

            {generatedDescription ? (
              <>
                <p>{generatedDescription}</p>

                <button
                  type="button"
                  className="copy-button"
                  onClick={() =>
                    navigator.clipboard.writeText(generatedDescription)
                  }
                >
                  Copy Description
                </button>
              </>
            ) : (
              <div className="preview-placeholder">
                <span>✨</span>
                <p>
                  Your generated description will appear here after you submit
                  the form.
                </p>
              </div>
            )}
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Generator;