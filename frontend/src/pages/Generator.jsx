import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Generator() {
  const [formData, setFormData] = useState({
    productName: "",
    ingredients: "",
    weight: "",
    features: "",
    tone: "Premium",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const generatedDescription = `${formData.productName} is a quality food product made with ${formData.ingredients}. It is ideal for customers looking for ${formData.features}.`;

    const response = await fetch("http://localhost:5000/api/descriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        description: generatedDescription,
      }),
    });

    if (response.ok) {
      setMessage("Description created and saved in MongoDB successfully.");
      setFormData({
        productName: "",
        ingredients: "",
        weight: "",
        features: "",
        tone: "Premium",
      });
    } else {
      setMessage("Failed to create description.");
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Product Description Generator
        </h1>

        <p className="text-gray-700 mb-6">
          Enter product details below to create and save a product description.
        </p>

        {message && (
          <p className="bg-green-100 text-green-800 p-3 rounded mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: Himalayan Apple Jam"
          />

          <label className="block mb-2 font-semibold">Ingredients</label>
          <input
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: Apple, sugar, lemon juice"
          />

          <label className="block mb-2 font-semibold">Weight</label>
          <input
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: 300g"
          />

          <label className="block mb-2 font-semibold">Key Features</label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: Natural, fruity, handmade"
          ></textarea>

          <label className="block mb-2 font-semibold">Tone</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          >
            <option>Premium</option>
            <option>Traditional</option>
            <option>Health-Focused</option>
          </select>

          <button
             type="submit"
             className="bg-green-700 text-white px-6 py-3 rounded cursor-pointer hover:bg-green-800 active:scale-95 transition"
          >
         Save Description
        </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Generator;