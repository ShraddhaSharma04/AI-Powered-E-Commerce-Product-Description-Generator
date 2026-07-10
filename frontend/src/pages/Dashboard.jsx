import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [descriptions, setDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState("");
  const [updatedTone, setUpdatedTone] = useState("Premium");

  async function fetchDescriptions() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/descriptions"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load product descriptions."
        );
      }

      setDescriptions(Array.isArray(data.data) ? data.data : []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDescriptions();
  }, []);

  async function updateDescription(id) {
    try {
      setMessage("");
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/descriptions/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tone: updatedTone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update the description."
        );
      }

      setMessage("Description updated successfully.");
      setEditingId("");

      await fetchDescriptions();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function deleteDescription(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product description?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/descriptions/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.message || "Unable to delete the description."
        );
      }

      setMessage("Description deleted successfully.");

      await fetchDescriptions();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-header">
          <p className="section-label">PRODUCT MANAGEMENT</p>

          <h1>Dashboard</h1>

          <p>
            Monitor and manage your product descriptions stored in
            MongoDB Atlas.
          </p>
        </section>

        {message && (
          <div className="success-message">{message}</div>
        )}

        {error && (
          <div className="error-message">{error}</div>
        )}

        <section className="dashboard-stats">
          <article className="stat-card">
            <span>{descriptions.length}</span>

            <h3>Saved Products</h3>

            <p>Descriptions stored in MongoDB</p>
          </article>

          <article className="stat-card">
            <span>AI</span>

            <h3>Content Generator</h3>

            <p>Professional product listing content</p>
          </article>

          <article className="stat-card">
            <span>3</span>

            <h3>Tone Styles</h3>

            <p>Premium, Traditional and Health-Focused</p>
          </article>
        </section>

        <section className="dashboard-products">
          <div className="dashboard-section-title">
            <div>
              <p className="section-label">YOUR COLLECTION</p>

              <h2>Saved Product Descriptions</h2>
            </div>

            <button
              type="button"
              className="refresh-button"
              onClick={fetchDescriptions}
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="loading-box">
              Loading product descriptions...
            </div>
          ) : descriptions.length === 0 ? (
            <div className="empty-state">
              <h3>No products saved</h3>

              <p>
                Create your first product description from the
                Generator page.
              </p>
            </div>
          ) : (
            <div className="dashboard-product-grid">
              {descriptions.map((item) => (
                <article
                  className="dashboard-product-card"
                  key={item._id}
                >
                  <div className="product-card-cover">
                    <span>
                      {item.productName
                        ? item.productName.charAt(0).toUpperCase()
                        : "P"}
                    </span>
                  </div>

                  <div className="product-card-body">
                    <div className="product-title-row">
                      <div className="product-heading">
                        <h3>{item.productName}</h3>

                        <p className="product-id">
                          Product ID: {item._id}
                        </p>
                      </div>

                      <span className="tone-badge">
                        {item.tone}
                      </span>
                    </div>

                    <div className="product-information-grid">
                      <div className="product-info-item">
                        <span className="info-label">
                          Weight
                        </span>

                        <p>{item.weight}</p>
                      </div>

                      <div className="product-info-item">
                        <span className="info-label">
                          Ingredients
                        </span>

                        <p>{item.ingredients}</p>
                      </div>

                      <div className="product-info-item">
                        <span className="info-label">
                          Features
                        </span>

                        <p>{item.features}</p>
                      </div>
                    </div>

                    <div className="description-box">
                      <span className="info-label">
                        Product Description
                      </span>

                      <p>{item.description}</p>
                    </div>

                    {editingId === item._id ? (
                      <div className="edit-panel">
                        <label htmlFor={`tone-${item._id}`}>
                          Update Tone
                        </label>

                        <select
                          id={`tone-${item._id}`}
                          value={updatedTone}
                          onChange={(event) =>
                            setUpdatedTone(event.target.value)
                          }
                        >
                          <option value="Premium">
                            Premium
                          </option>

                          <option value="Traditional">
                            Traditional
                          </option>

                          <option value="Health-Focused">
                            Health-Focused
                          </option>
                        </select>

                        <div className="card-actions">
                          <button
                            type="button"
                            className="update-button"
                            onClick={() =>
                              updateDescription(item._id)
                            }
                          >
                            Save Update
                          </button>

                          <button
                            type="button"
                            className="cancel-button"
                            onClick={() => setEditingId("")}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="card-actions">
                        <button
                          type="button"
                          className="update-button"
                          onClick={() => {
                            setEditingId(item._id);
                            setUpdatedTone(item.tone);
                          }}
                        >
                          Edit Tone
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() =>
                            deleteDescription(item._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;