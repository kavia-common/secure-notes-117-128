import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../api/client";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";

/**
 * Main notes page, shows note list, selected note, and editor.
 * Handles all notes CRUD via backend with JWT auth.
 * Requires authentication.
 */
// PUBLIC_INTERFACE
export default function NotesPage() {
  const { token, logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null); // note id
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("/notes", { method: "GET", token });
      setNotes(res.notes || res);
      setError("");
    } catch (e) {
      setError(e.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, [token]);

  const handleSelect = (note) => setSelected(note);

  const handleCreate = async () => {
    // Create new blank note
    setSaving(true);
    try {
      const res = await apiRequest("/notes", {
        method: "POST",
        data: { title: "Untitled", content: "" },
        token,
      });
      setNotes((prev) => [res, ...prev]);
      setSelected(res);
      setError("");
    } catch (e) {
      setError(e.message || "Create failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await apiRequest(`/notes/${id}`, { method: "DELETE", token });
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selected && selected.id === id) setSelected(null);
      setError("");
    } catch (e) {
      setError(e.message || "Delete failed");
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (id, title, content) => {
    setSaving(true);
    try {
      const res = await apiRequest(`/notes/${id}`, {
        method: "PUT",
        data: { title, content },
        token,
      });
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, title, content } : n))
      );
      setError("");
      setSelected(res);
    } catch (e) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container" style={{ minHeight: "60vh", display: "flex", flexDirection: "row", gap: 32 }}>
      <div style={{ flex: "1 1 220px" }}>
        <button style={{ marginBottom: "1.5em", width: "100%" }} onClick={handleCreate} disabled={saving}>
          + New Note
        </button>
        {loading ? (
          <div className="spinner">Loading notes...</div>
        ) : (
          <NoteList
            notes={notes}
            selected={selected}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        )}
        {error && (
          <div className="form-error" style={{ marginTop: "0.5em" }}>{error}</div>
        )}
      </div>
      <div style={{ flex: 2 }}>
        <NoteEditor
          note={selected}
          disabled={saving}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
