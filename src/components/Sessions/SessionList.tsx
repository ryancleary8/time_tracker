<<<<<<< ours
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
=======
import type { Session } from '../../types';
import { formatDisplayDate, formatDuration } from '../../utils/time';

interface SessionListProps {
  sessions: Session[];
  selectedId: string | null;
  onSelect: (session: Session) => void;
>>>>>>> theirs
  onEdit: (session: Session) => void;
  onDelete: (session: Session) => void;
}

<<<<<<< ours
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
=======
const SessionList = ({ sessions, selectedId, onSelect, onEdit, onDelete }: SessionListProps) => {
  if (sessions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        No sessions yet. Track time to see them here.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {sessions.map((session) => {
        const isSelected = session.id === selectedId;
        return (
          <li
            key={session.id}
            className={`rounded-lg border p-4 shadow-sm transition-colors ${
              isSelected
                ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/30'
                : 'border-slate-200 bg-white hover:border-primary-300 dark:border-slate-700 dark:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onSelect(session)}
                className="text-left text-sm text-slate-600 hover:underline focus:outline-none dark:text-slate-200"
              >
                <div className="text-base font-semibold text-slate-800 dark:text-slate-100">{session.category}</div>
                <div>{formatDisplayDate(session.start)}</div>
              </button>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {formatDuration(session.durationMs)}
                </span>
                <button
                  type="button"
                  className="rounded-md border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100"
                  onClick={() => onEdit(session)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-md border border-rose-200 px-3 py-1 text-xs text-rose-600 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300"
                  onClick={() => onDelete(session)}
                >
                  Delete
                </button>
              </div>
            </div>
            {session.notes && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">{session.notes}</p>
            )}
          </li>
        );
      })}
    </ul>
>>>>>>> theirs
  );
};

export default SessionList;
