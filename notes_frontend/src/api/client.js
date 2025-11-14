import { useAuth } from "../context/AuthContext";

/**
 * API client for authenticated requests to backend.
 * Adds 'Authorization: Bearer <token>' to protected endpoints.
 */
export async function apiRequest(path, { method = 'GET', data, token } = {}) {
  const baseUrl = process.env.REACT_APP_API_BASE || "http://localhost:3001";
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const opts = {
    method,
    headers,
  };
  if (data) opts.body = JSON.stringify(data);

  const res = await fetch(`${baseUrl}${path}`, opts);
  // Handle error responses
  const responseContentType = res.headers.get("content-type");
  let resp;
  if (responseContentType && responseContentType.includes("application/json")) {
    resp = await res.json();
  } else {
    resp = await res.text();
  }
  if (!res.ok) {
    throw new Error(resp?.detail || resp?.message || res.statusText || "Request failed");
  }
  return resp;
}
