import React, { useState, useEffect } from "react";

/**
 * Edit selected note, allows title/content editing and save/delete.
 * @param {Object} note
 * @param {boolean} disabled
 * @param {function} onSave
 * @param {function} onDelete
 */
// PUBLIC_INTERFACE
export default function NoteEditor({ note, disabled, onSave, onDelete }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  if (!note) {
    return <div style={{ color: "#b1b4bb", marginTop: "2em" }}>Select a note to edit.</div>;
  }

  const handleSave = (e) => {
    e.preventDefault();
    onSave(note.id, title, content);
  };

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "1em" }} onSubmit={handleSave}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        disabled={disabled}
        onChange={e => setTitle(e.target.value)}
        style={{ fontWeight: 500, fontSize: 18, border: "1px solid #e5e7eb" }}
        required
      />
      <textarea
        rows={8}
        placeholder="Type your note here..."
        value={content}
        disabled={disabled}
        onChange={e => setContent(e.target.value)}
        style={{ resize: "vertical" }}
      />
      <div style={{ display: "flex", justifyContent: "flex-start", gap: "1em", marginTop: 8 }}>
        <button type="submit" disabled={disabled} style={{ minWidth: 100 }}>
          Save
        </button>
        <button
          type="button"
          disabled={disabled}
          style={{ minWidth: 100, background: "#ef4444" }}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
