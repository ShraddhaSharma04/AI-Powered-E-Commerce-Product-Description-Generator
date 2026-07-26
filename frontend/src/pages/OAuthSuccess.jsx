import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function OAuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { saveAuthentication } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userValue = searchParams.get("user");

    if (!token || !userValue) {
      navigate("/login?oauth=failed", { replace: true });
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userValue));

      saveAuthentication(token, user);

      navigate("/dashboard", { replace: true });
    } catch {
      navigate("/login?oauth=failed", { replace: true });
    }
  }, [navigate, saveAuthentication, searchParams]);

  return (
    <main className="auth-loading-page">
      <div>
        <div className="auth-loader" />
        <p>Completing Google sign in...</p>
      </div>
    </main>
  );
}

export default OAuthSuccess;