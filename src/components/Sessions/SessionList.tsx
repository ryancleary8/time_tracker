import { useMemo } from "react";
import { Session } from "../../types/session";
import SessionItem from "./SessionItem";

export type SortField = "date" | "duration" | "category";
export type SortDirection = "asc" | "desc";

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

interface SessionListProps {
  sessions: Session[];
  sort: SortState;
  onSortChange: (sort: SortState) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
}

const sortIndicators: Record<SortDirection, string> = {
  asc: "▲",
  desc: "▼",
};

const SessionList = ({
  sessions,
  sort,
  onSortChange,
  searchTerm,
  onSearchTermChange,
  onEdit,
  onDelete,
}: SessionListProps) => {
  const filteredSessions = useMemo(() => {
    if (!searchTerm) {
      return sessions;
    }
    const lowered = searchTerm.toLowerCase();
    return sessions.filter((session) => session.notes.toLowerCase().includes(lowered));
  }, [sessions, searchTerm]);

  const sortedSessions = useMemo(() => {
    const next = [...filteredSessions];
    next.sort((a, b) => {
      let comparison = 0;
      if (sort.field === "date") {
        comparison = new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime();
      } else if (sort.field === "duration") {
        comparison = a.durationMs - b.durationMs;
      } else {
        comparison = a.category.localeCompare(b.category);
      }
      return sort.direction === "asc" ? comparison : -comparison;
    });
    return next;
  }, [filteredSessions, sort]);

  const handleSortClick = (field: SortField) => {
    if (sort.field === field) {
      onSortChange({ field, direction: sort.direction === "asc" ? "desc" : "asc" });
    } else {
      onSortChange({ field, direction: "asc" });
    }
  };

  const renderSortButton = (field: SortField, label: string) => {
    const isActive = sort.field === field;
    return (
      <button
        type="button"
        onClick={() => handleSortClick(field)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          fontWeight: isActive ? 700 : 500,
        }}
      >
        {label}
        {isActive && <span aria-hidden="true">{sortIndicators[sort.direction]}</span>}
      </button>
    );
  };

  const getAriaSort = (field: SortField) => {
    if (sort.field !== field) {
      return undefined;
    }
    return sort.direction === "asc" ? "ascending" : "descending";
  };

  return (
    <section>
      <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Sessions</h3>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.875rem" }}>Search notes</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Search notes"
            style={{
              padding: "0.4rem 0.6rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5f5",
            }}
          />
        </label>
      </div>
      {sortedSessions.length === 0 ? (
        <p style={{ color: "#64748b" }}>No sessions yet. Track some time to see them here.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", backgroundColor: "#f1f5f9" }}>
                <th style={{ padding: "0.5rem" }} aria-sort={getAriaSort("date")}>
                  {renderSortButton("date", "Date")}
                </th>
                <th style={{ padding: "0.5rem" }} aria-sort={getAriaSort("duration")}>
                  {renderSortButton("duration", "Duration")}
                </th>
                <th style={{ padding: "0.5rem" }} aria-sort={getAriaSort("category")}>
                  {renderSortButton("category", "Category")}
                </th>
                <th style={{ padding: "0.5rem" }}>Notes</th>
                <th style={{ padding: "0.5rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedSessions.map((session) => (
                <SessionItem key={session.id} session={session} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default SessionList;
