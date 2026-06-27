import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  }

  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link to="/" className="text-xl font-bold text-green-700">
          AI ProductGen
        </Link>

        <div className="flex flex-wrap gap-4 text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/generator">Generator</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <button
          onClick={toggleTheme}
          className="border px-4 py-2 rounded text-gray-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;