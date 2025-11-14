import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, Navigate } from "react-router-dom";

/**
 * Login form for existing users, sets JWT in AuthContext.
 * On success, redirects to /notes.
 */
// PUBLIC_INTERFACE
export default function LoginPage() {
  const { login, isAuthenticated, loadingAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/notes" />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(email, password);
    if (res.success) {
      navigate("/notes");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Log In</h2>
      <form autoComplete="off" onSubmit={handleLogin}>
        <div>
          <input
            required
            type="email"
            placeholder="Email address"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loadingAuth}
          />
        </div>
        <div>
          <input
            required
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loadingAuth}
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <button type="submit" disabled={loadingAuth}>
          {loadingAuth ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div style={{ marginTop: "1.4em" }}>
        New user? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
