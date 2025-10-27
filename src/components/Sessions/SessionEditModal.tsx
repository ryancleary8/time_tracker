import { type CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { Session } from "../../types/session";

interface SessionEditModalProps {
  session: Session | null;
  onSave: (updates: { category: string; notes: string }) => void;
  onCancel: () => void;
  onToast?: (message: string) => void;
}

const overlayStyles: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  zIndex: 1000,
};

const modalStyles: CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  width: "min(480px, 100%)",
  boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
};

const SessionEditModal = ({ session, onSave, onCancel, onToast }: SessionEditModalProps) => {
  const [category, setCategory] = useState(session?.category ?? "");
  const [notes, setNotes] = useState(session?.notes ?? "");
  const categoryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCategory(session?.category ?? "");
    setNotes(session?.notes ?? "");
  }, [session]);

  useEffect(() => {
    if (session) {
      categoryRef.current?.focus();
    }
  }, [session]);

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

  if (!session) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({ category, notes });
    onToast?.("Session updated");
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="edit-session-title" style={overlayStyles}>
      <div style={modalStyles}>
        <h2 id="edit-session-title" style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
          Edit session
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "0.75rem", fontWeight: 600 }}>
            Category
            <input
              ref={categoryRef}
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
              rows={4}
              style={{
                width: "100%",
                marginTop: "0.25rem",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid #cbd5f5",
              }}
            />
          </label>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
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
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionEditModal;
