import { type CSSProperties } from "react";
import { Session } from "../../types/session";
import { formatDateTime, formatDuration } from "../../utils/datetime";

interface SessionItemProps {
  session: Session;
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
}

const buttonStyles: CSSProperties = {
  padding: "0.25rem 0.5rem",
  borderRadius: "0.375rem",
  border: "1px solid #cbd5f5",
  background: "#fff",
  cursor: "pointer",
};

const SessionItem = ({ session, onEdit, onDelete }: SessionItemProps) => {
  return (
    <tr>
      <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0" }}>
        {formatDateTime(session.endedAt)}
      </td>
      <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0" }}>
        {formatDuration(session.durationMs)}
      </td>
      <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0" }}>{session.category}</td>
      <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0" }}>{session.notes}</td>
      <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => onEdit(session)}
            style={{ ...buttonStyles, borderColor: "#2563eb", color: "#2563eb" }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(session)}
            style={{ ...buttonStyles, borderColor: "#f87171", color: "#b91c1c" }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SessionItem;
