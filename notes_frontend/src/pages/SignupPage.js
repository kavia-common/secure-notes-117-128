import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

/**
 * Signup form to register a new account.
 * On success, redirects to login.
 */
// PUBLIC_INTERFACE
export default function SignupPage() {
  const { signup, loadingAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await signup(email, password);
    if (res.success) {
      setSuccess("Signup successful! Please login.");
      setTimeout(() => navigate("/login"), 1100);
    } else {
      setError(res.error || "Signup failed");
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form autoComplete="off" onSubmit={handleSignup}>
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
            autoComplete="new-password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loadingAuth}
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}
        <button type="submit" disabled={loadingAuth}>
          {loadingAuth ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div style={{ marginTop: "1.4em" }}>
        Have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
