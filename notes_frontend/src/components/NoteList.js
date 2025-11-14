import React from "react";

/**
 * Display a list of notes, highlight selected, allow to select and delete.
 * @param {Array} notes
 * @param {Object} selected
 * @param {function} onSelect
 * @param {function} onDelete
 */
// PUBLIC_INTERFACE
export default function NoteList({ notes, selected, onSelect, onDelete }) {
  return (
    <div style={{ minWidth: 200 }}>
      {notes.length === 0 && (
        <div style={{ color: "#64748b", marginTop: "2em" }}>No notes. Create your first!</div>
      )}
      {notes.map((note) => (
        <div
          className={`note-list-item${selected && selected.id === note.id ? " selected" : ""}`}
          key={note.id}
          onClick={() => onSelect(note)}
        >
          <span className="note-title">{note.title || "Untitled"}</span>{" "}
          <span className="note-actions">
            <button
              title="Delete"
              style={{
                marginLeft: 8,
                background: "#ef4444",
                color: "#fff",
                border: "none",
                padding: "4px 8px",
                borderRadius: 6,
                fontSize: 13,
                cursor: "pointer",
              }}
              onClick={e => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            >🗑</button>
          </span>
        </div>
      ))}
    </div>
  );
}
