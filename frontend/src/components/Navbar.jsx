import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMobileMenu();
    navigate("/login");
  }

  function navLinkClass({ isActive }) {
    return isActive ? "nav-link active" : "nav-link";
  }

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="brand-icon">✦</span>
          <span>AI ProductGen</span>
        </Link>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <div
          className={
            mobileMenuOpen
              ? "navbar-links navbar-links-open"
              : "navbar-links"
          }
        >
          <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/generator"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            Generator
          </NavLink>

          <NavLink
            to="/dashboard"
            className={navLinkClass}
            onClick={closeMobileMenu}
          >
            Dashboard
          </NavLink>

          {isAuthenticated ? (
            <div className="navbar-user-section">
              <span className="navbar-user-name">
                Hi, {user?.name?.split(" ")[0] || "User"}
              </span>

              <button
                type="button"
                className="navbar-logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth-links">
              <NavLink
                to="/login"
                className="navbar-login-link"
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="navbar-register-link"
                onClick={closeMobileMenu}
              >
                Register
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className="theme-toggle-button"
            onClick={() => setDarkMode((current) => !current)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;