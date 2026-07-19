import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../utils/api";

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
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validateForm() {
    if (
      !formData.productName.trim() ||
      !formData.ingredients.trim() ||
      !formData.weight.trim() ||
      !formData.features.trim()
    ) {
      setError("Please complete all product fields.");
      return false;
    }

    return true;
  }

  async function generateAIDescription() {
    setMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setGenerating(true);
      setGeneratedDescription("");

      const data = await apiRequest("/api/ai/generate-description", {
        method: "POST",
        body: JSON.stringify({
          productName: formData.productName,
          ingredients: formData.ingredients,
          weight: formData.weight,
          tone: formData.tone,
          features: formData.features,
        }),
      });

      setGeneratedDescription(data.data.description);
      setMessage("AI description generated successfully.");
    } catch (requestError) {
      setError(requestError.message || "Unable to generate AI description.");
    } finally {
      setGenerating(false);
    }
  }

  async function saveDescription() {
    setMessage("");
    setError("");

    if (!validateForm()) {
      return;
    }

    if (!generatedDescription) {
      setError("Please generate an AI description before saving.");
      return;
    }

    try {
      setSaving(true);

      const data = await apiRequest("/api/descriptions", {
        method: "POST",
        body: JSON.stringify({
          productName: formData.productName,
          ingredients: formData.ingredients,
          weight: formData.weight,
          tone: formData.tone,
          features: formData.features,
          description: generatedDescription,
        }),
      });

      setGeneratedDescription(data.data.description);
      setMessage("Description saved in MongoDB successfully.");
      setFormData(initialForm);
    } catch (requestError) {
      setError(requestError.message || "Unable to save description.");
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

          <h1>Create an AI Product Description</h1>

          <p>
            Enter your product information, generate a real AI description
            using Gemini, and save it directly to MongoDB.
          </p>
        </section>

        <section className="generator-layout">
          <form
            className="generator-form-card"
            onSubmit={(event) => {
              event.preventDefault();
              generateAIDescription();
            }}
          >
            <div className="form-title">
              <span>01</span>

              <div>
                <h2>Product Information</h2>
                <p>Complete the details below for AI generation.</p>
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
                  placeholder="Example: Traditional Mango Pickle"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="ingredients">Ingredients</label>

                <textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Raw mango, mustard oil, salt, Indian spices"
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
                  placeholder="Example: 500g"
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
                  placeholder="Homemade taste, spicy, preservative-free"
                  rows="4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={generating}
            >
              {generating
                ? "Generating with Gemini..."
                : "Generate AI Description"}
            </button>

            <button
              type="button"
              className="save-ai-button"
              onClick={saveDescription}
              disabled={saving || generating || !generatedDescription}
            >
              {saving ? "Saving..." : "Save Description to MongoDB"}
            </button>
          </form>

          <aside className="description-preview">
            <div className="preview-number">02</div>

            <h2>AI Description Preview</h2>

            {generating ? (
              <div className="preview-placeholder">
                <span>⏳</span>

                <p>Gemini is generating your product description...</p>
              </div>
            ) : generatedDescription ? (
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
                  Your AI-generated description will appear here after you
                  submit the form.
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