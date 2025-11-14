import React, { createContext, useState, useContext, useEffect, useCallback } from "react";

/**
 * Context to manage authentication state, login/logout, JWT, and user info.
 * Persists token to localStorage for session survival.
 */
// PUBLIC_INTERFACE
const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * AuthProvider wraps the app and provides login, logout, and token utilities.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(null); // User info could be extended in future
  const [loading, setLoading] = useState(false);

  // Attach/detach JWT in localStorage as needed
  useEffect(() => {
    if (token) {
      localStorage.setItem("jwt", token);
    } else {
      localStorage.removeItem("jwt");
    }
  }, [token]);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid email or password");
      const data = await res.json();
      if (!data.access_token) throw new Error("No token from backend");
      setToken(data.access_token);
      setUser({ email });
      setLoading(false);
      return { success: true };
    } catch (e) {
      setLoading(false);
      return { success: false, error: e.message };
    }
  };

  // PUBLIC_INTERFACE
  const signup = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        let msg = "Signup failed";
        try {
          const errData = await res.json();
          msg = errData.detail || msg;
        } catch {}
        throw new Error(msg);
      }
      setLoading(false);
      return { success: true };
    } catch (e) {
      setLoading(false);
      return { success: false, error: e.message };
    }
  };

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("jwt");
  }, []);

  // Auth state and utilities for children
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        signup,
        isAuthenticated: !!token,
        loadingAuth: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
