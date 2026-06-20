import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input, Toast, Loader } from "../components/ui";

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

        <Toast message="Week 3 UI components are working successfully." />

        <div className="bg-white p-6 rounded shadow">
          <Input
            label="Product Name"
            placeholder="Example: Himalayan Millet Cookies"
          />

          <Input
            label="Ingredients"
            placeholder="Example: Millet, jaggery, dry fruits"
          />

          <Input
            label="Weight"
            placeholder="Example: 250g"
          />

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Key Features
            </label>
            <textarea
              className="w-full border p-3 rounded"
              placeholder="Example: Healthy, natural, handmade"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">
              Tone
            </label>
            <select className="w-full border p-3 rounded">
              <option>Premium</option>
              <option>Traditional</option>
              <option>Health-Focused</option>
            </select>
          </div>

          <Button>Generate Description</Button>

          <div className="mt-6">
            <Loader text="AI output will appear here in upcoming weeks." />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Generator;