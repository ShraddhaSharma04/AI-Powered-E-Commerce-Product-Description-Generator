import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Generator() {
  return (
    <>
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          Product Description Generator
        </h1>

        <p className="text-gray-700 mb-6">
          Enter product details below. AI functionality will be added later.
        </p>

        <div className="bg-white p-6 rounded shadow">
          <label className="block mb-2 font-semibold">Product Name</label>
          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: Himalayan Millet Cookies"
          />

          <label className="block mb-2 font-semibold">Ingredients</label>
          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: Millet, jaggery, dry fruits"
          />

          <label className="block mb-2 font-semibold">Weight</label>
          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: 250g"
          />

          <label className="block mb-2 font-semibold">Key Features</label>
          <textarea
            className="w-full border p-3 rounded mb-4"
            placeholder="Example: Healthy, natural, handmade"
          ></textarea>

          <label className="block mb-2 font-semibold">Tone</label>
          <select className="w-full border p-3 rounded mb-4">
            <option>Premium</option>
            <option>Traditional</option>
            <option>Health-Focused</option>
          </select>

          <button className="bg-green-700 text-white px-6 py-3 rounded">
            Generate Description
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Generator;