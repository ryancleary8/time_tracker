import { FormEvent, useEffect, useRef, useState } from "react";
import { SessionDraft } from "../../types/session";
import { formatDateTime, formatDuration } from "../../utils/datetime";

interface SessionFormProps {
  draft: SessionDraft | null;
  onSave: (session: { category: string; notes: string }) => void;
  onCancel: () => void;
  onToast?: (message: string) => void;
}

const SessionForm = ({ draft, onSave, onCancel, onToast }: SessionFormProps) => {
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const categoryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCategory("");
    setNotes("");
  }, [draft?.startedAt]);

  useEffect(() => {
    categoryInputRef.current?.focus();
  }, [draft]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  if (!draft) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({ category, notes });
    onToast?.("Session saved");
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        padding: "1rem",
        borderRadius: "0.5rem",
        maxWidth: "480px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(15, 23, 42, 0.08)",
      }}
    >
      <h2 style={{ marginBottom: "0.75rem", fontSize: "1.25rem" }}>Save session</h2>
      <div style={{ fontSize: "0.875rem", marginBottom: "1rem", color: "#475569" }}>
        <div>Started: {formatDateTime(draft.startedAt)}</div>
        <div>Ended: {formatDateTime(draft.endedAt)}</div>
        <div>Duration: {formatDuration(draft.durationMs)}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
          Category
          <input
            ref={categoryInputRef}
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5f5",
            }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "1rem", fontWeight: 600 }}>
          Notes
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5f5",
            }}
          />
        </label>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "1px solid #94a3b8",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save session
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
