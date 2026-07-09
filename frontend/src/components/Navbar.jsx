import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="brand">
          AI ProductGen
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/generator">Generator</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>

          <button
            type="button"
            className="theme-button"
            onClick={() => setDarkMode((current) => !current)}
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;