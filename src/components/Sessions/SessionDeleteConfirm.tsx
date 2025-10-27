import { type CSSProperties, FormEvent, useEffect, useRef } from "react";
import { Session } from "../../types/session";

interface SessionDeleteConfirmProps {
  session: Session | null;
  onConfirm: () => void;
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
  zIndex: 1100,
};

const dialogStyles: CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  width: "min(420px, 100%)",
  boxShadow: "0 16px 32px rgba(15, 23, 42, 0.2)",
};

const SessionDeleteConfirm = ({ session, onConfirm, onCancel, onToast }: SessionDeleteConfirmProps) => {
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (session) {
      confirmButtonRef.current?.focus();
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
    onConfirm();
    onToast?.("Session deleted");
  };

  return (
    <div role="alertdialog" aria-modal="true" aria-labelledby="delete-session-title" style={overlayStyles}>
      <div style={dialogStyles}>
        <h2 id="delete-session-title" style={{ marginBottom: "0.75rem", fontSize: "1.25rem" }}>
          Delete session
        </h2>
        <p style={{ marginBottom: "1.25rem", color: "#475569" }}>
          Are you sure you want to delete the session "{session.category}" captured on {new Date(session.endedAt).toLocaleDateString()}?
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
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
            ref={confirmButtonRef}
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              background: "#dc2626",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionDeleteConfirm;
