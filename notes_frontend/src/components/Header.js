import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * App header. Shows app name and login/logout. Styles per guide.
 */
// PUBLIC_INTERFACE
export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/notes" style={{ textDecoration: "none" }}>
        <h1 style={{
          color: "var(--color-primary)",
          fontWeight: 700,
          fontSize: "1.8rem",
          margin: 0,
          letterSpacing: "-.03em",
          lineHeight: 1.2
        }}>
          SecureNotes
        </h1>
      </Link>
      <nav style={{ display: "flex", alignItems: "center", gap: "1.2em" }}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ fontWeight: 500, color: "var(--color-primary)" }}>Login</Link>
            <Link to="/signup" style={{ fontWeight: 500 }}>Sign Up</Link>
          </>
        ) : (
          <>
            <span style={{ color: "var(--color-secondary)", fontSize: "0.96em" }}>
              {user?.email || ""}
            </span>
            <button style={{ background: "var(--color-error)", color: "#fff" }} onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}
