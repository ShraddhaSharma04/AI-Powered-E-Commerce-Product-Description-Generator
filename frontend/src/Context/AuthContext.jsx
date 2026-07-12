import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_BASE_URL = "http://localhost:5000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [loading, setLoading] = useState(true);

  function saveAuthentication(authToken, authenticatedUser) {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(authenticatedUser));

    setToken(authToken);
    setUser(authenticatedUser);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");
    setUser(null);
  }

  async function register(formData) {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    saveAuthentication(data.token, data.user);

    return data;
  }

  async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    saveAuthentication(data.token, data.user);

    return data;
  }

  useEffect(() => {
    async function verifyUser() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Authentication failed.");
        }

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    verifyUser();
  }, [token]);

  const contextValue = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      register,
      login,
      logout,
      saveAuthentication,
    }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}