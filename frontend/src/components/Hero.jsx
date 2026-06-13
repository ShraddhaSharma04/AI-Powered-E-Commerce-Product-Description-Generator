import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-green-50 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          AI-Powered E-Commerce Product Description Generator
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Generate professional and keyword-rich product descriptions for food
          processing businesses using AI.
        </p>

        <Link
          to="/generator"
          className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded"
        >
          Start Generating
        </Link>
      </div>
    </section>
  );
}

export default Hero;