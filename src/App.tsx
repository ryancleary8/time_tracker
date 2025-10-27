<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
import { FormEvent, useMemo, useState } from 'react';
import { useSessions } from './context/SessionContext';
import { CreateSessionInput } from '../types';

const createInitialSession = (): CreateSessionInput => ({
  title: '',
  description: '',
  startedAt: new Date().toISOString(),
  endedAt: null,
});

const App = () => {
  const { sessions, addSession, removeSession } = useSessions();
  const [formState, setFormState] = useState<CreateSessionInput>(createInitialSession);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.title.trim()) {
      return;
    }

    await addSession(formState);
    setFormState(createInitialSession());
  };

  const canSubmit = useMemo(() => formState.title.trim().length > 0, [formState.title]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-8">
      <header>
        <h1 className="text-3xl font-semibold">Time Tracker</h1>
        <p className="text-muted-foreground text-sm">
          Manage your sessions without leaving the page.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-md border p-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Title</span>
          <input
            className="rounded border px-3 py-2"
            value={formState.title}
            onChange={(event) =>
              setFormState((previous) => ({ ...previous, title: event.target.value }))
            }
            placeholder="Sprint planning"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Description</span>
          <textarea
            className="rounded border px-3 py-2"
            value={formState.description ?? ''}
            onChange={(event) =>
              setFormState((previous) => ({ ...previous, description: event.target.value }))
            }
            placeholder="Plan the tasks for the next sprint"
          />
        </label>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-blue-400"
          disabled={!canSubmit}
        >
          Add session
        </button>
      </form>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-muted-foreground">No sessions tracked yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {sessions.map((session) => (
              <li key={session.id} className="flex flex-col gap-1 rounded border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{session.title}</h3>
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => {
                      void removeSession(session.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
                {session.description ? (
                  <p className="text-muted-foreground text-sm">{session.description}</p>
                ) : null}
                <p className="text-xs text-muted-foreground">
                  Started: {new Date(session.startedAt).toLocaleString()}
                </p>
                {session.endedAt ? (
                  <p className="text-xs text-muted-foreground">
                    Ended: {new Date(session.endedAt).toLocaleString()}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
=======
import Timesheet from './components/Timesheet/Timesheet';
import type { TimesheetCategory, TimesheetSession } from './hooks/useTimesheet';

const categories: TimesheetCategory[] = [
  { id: 'dev', name: 'Development', color: '#6366F1' },
  { id: 'design', name: 'Design', color: '#F97316' },
  { id: 'meetings', name: 'Meetings', color: '#22C55E' },
  { id: 'ops', name: 'Operations', color: '#0EA5E9' },
];

const sessions: TimesheetSession[] = [
  { id: '1', start: '2024-03-25T09:00:00', end: '2024-03-25T11:30:00', categoryId: 'dev' },
  { id: '2', start: '2024-03-25T13:00:00', end: '2024-03-25T14:15:00', categoryId: 'meetings' },
  { id: '3', start: '2024-03-26T10:00:00', end: '2024-03-26T12:00:00', categoryId: 'design' },
  { id: '4', start: '2024-03-27T08:30:00', end: '2024-03-27T11:30:00', categoryId: 'dev' },
  { id: '5', start: '2024-03-27T14:00:00', end: '2024-03-27T15:00:00', categoryId: 'meetings' },
  { id: '6', start: '2024-03-28T09:30:00', end: '2024-03-28T10:30:00', categoryId: 'ops' },
  { id: '7', start: '2024-04-01T09:00:00', end: '2024-04-01T12:30:00', categoryId: 'dev' },
  { id: '8', start: '2024-04-02T11:00:00', end: '2024-04-02T12:00:00', categoryId: 'meetings' },
  { id: '9', start: '2024-04-03T09:30:00', end: '2024-04-03T10:30:00', categoryId: 'design' },
  { id: '10', start: '2024-04-04T13:00:00', end: '2024-04-04T15:30:00', categoryId: 'dev' },
  { id: '11', start: '2024-04-05T08:30:00', end: '2024-04-05T10:00:00', categoryId: 'ops' },
];

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <Timesheet sessions={sessions} categories={categories} />
      </div>
>>>>>>> theirs
=======
import { useEffect, useMemo, useState } from "react";
import SessionDeleteConfirm from "./components/Sessions/SessionDeleteConfirm";
import SessionEditModal from "./components/Sessions/SessionEditModal";
import SessionFilters, { type FilterState } from "./components/Sessions/SessionFilters";
import SessionForm from "./components/Sessions/SessionForm";
import SessionList, { type SortState } from "./components/Sessions/SessionList";
import { Session, SessionDraft } from "./types/session";
import { formatDuration, startOfToday, startOfWeek, toDateInputValue } from "./utils/datetime";

const generateId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const today = startOfToday();
const initialFilters: FilterState = {
  range: "today",
  startDate: toDateInputValue(today),
  endDate: toDateInputValue(today),
  categories: [],
};

const App = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [draft, setDraft] = useState<SessionDraft | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState<SortState>({ field: "date", direction: "desc" });
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [deletingSession, setDeletingSession] = useState<Session | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!isRunning || startTime === null) {
      return;
    }
    const interval = window.setInterval(() => {
      setElapsedMs(Date.now() - startTime);
    }, 200);
    return () => window.clearInterval(interval);
  }, [isRunning, startTime]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleStart = () => {
    const now = Date.now();
    setStartTime(now);
    setElapsedMs(0);
    setIsRunning(true);
    setShowForm(false);
    setDraft(null);
  };

  const handleStop = () => {
    if (!isRunning || startTime === null) {
      return;
    }
    const ended = Date.now();
    setIsRunning(false);
    setElapsedMs(ended - startTime);
    setDraft({
      startedAt: new Date(startTime).toISOString(),
      endedAt: new Date(ended).toISOString(),
      durationMs: ended - startTime,
    });
    setShowForm(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedMs(0);
    setShowForm(false);
    setDraft(null);
  };

  const handleSaveSession = ({ category, notes }: { category: string; notes: string }) => {
    if (!draft) {
      return;
    }
    const timestamp = new Date().toISOString();
    const newSession: Session = {
      id: generateId(),
      startedAt: draft.startedAt,
      endedAt: draft.endedAt,
      durationMs: draft.durationMs,
      category,
      notes,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    setSessions((previous) => [newSession, ...previous]);
    setShowForm(false);
    setDraft(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setDraft(null);
  };

  const handleSortChange = (nextSort: SortState) => {
    setSort(nextSort);
  };

  const handleFiltersChange = (nextFilters: FilterState) => {
    if (nextFilters.range === "week") {
      const start = startOfWeek();
      setFilters({
        range: "week",
        startDate: toDateInputValue(start),
        endDate: toDateInputValue(new Date()),
        categories: nextFilters.categories,
      });
      return;
    }
    setFilters(nextFilters);
  };

  const availableCategories = useMemo(() => {
    const unique = new Set(sessions.map((session) => session.category));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const sessionEnd = new Date(session.endedAt);
      if (filters.startDate) {
        const start = new Date(filters.startDate);
        start.setHours(0, 0, 0, 0);
        if (sessionEnd.getTime() < start.getTime()) {
          return false;
        }
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        if (sessionEnd.getTime() > end.getTime()) {
          return false;
        }
      }
      if (filters.categories.length > 0 && !filters.categories.includes(session.category)) {
        return false;
      }
      return true;
    });
  }, [sessions, filters]);

  const showToast = (message: string) => {
    setToast(message);
  };

  const handleEdit = (session: Session) => {
    setEditingSession(session);
  };

  const handleUpdateSession = ({ category, notes }: { category: string; notes: string }) => {
    if (!editingSession) {
      return;
    }
    const updatedTimestamp = new Date().toISOString();
    setSessions((previous) =>
      previous.map((session) =>
        session.id === editingSession.id
          ? { ...session, category, notes, updatedAt: updatedTimestamp }
          : session,
      ),
    );
    setEditingSession(null);
  };

  const handleDelete = (session: Session) => {
    setDeletingSession(session);
  };

  const handleConfirmDelete = () => {
    if (!deletingSession) {
      return;
    }
    setSessions((previous) => previous.filter((session) => session.id !== deletingSession.id));
    setDeletingSession(null);
  };

  const activeDuration = isRunning ? elapsedMs : draft?.durationMs ?? elapsedMs;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#e2e8f0", minHeight: "100vh" }}>
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Time tracker</h1>
          <p style={{ color: "#475569" }}>Track sessions with categories and notes, then review and manage them.</p>
        </header>

        <section
          style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            padding: "1.5rem",
            marginBottom: "2rem",
            boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Stopwatch</h2>
          <div style={{ fontSize: "2.5rem", fontVariantNumeric: "tabular-nums", marginBottom: "1.5rem" }}>
            {formatDuration(activeDuration)}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleStart}
              disabled={isRunning}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                backgroundColor: isRunning ? "#94a3b8" : "#16a34a",
                color: "#fff",
                cursor: isRunning ? "not-allowed" : "pointer",
                fontWeight: 600,
              }}
            >
              Start
            </button>
            <button
              type="button"
              onClick={handleStop}
              disabled={!isRunning}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                backgroundColor: !isRunning ? "#94a3b8" : "#2563eb",
                color: "#fff",
                cursor: !isRunning ? "not-allowed" : "pointer",
                fontWeight: 600,
              }}
            >
              Stop
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "1px solid #94a3b8",
                backgroundColor: "transparent",
                color: "#0f172a",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Reset
            </button>
          </div>
        </section>

        {showForm && (
          <SessionForm draft={draft} onSave={handleSaveSession} onCancel={handleCancelForm} onToast={showToast} />
        )}

        <SessionFilters filters={filters} availableCategories={availableCategories} onChange={handleFiltersChange} />

        <SessionList
          sessions={filteredSessions}
          sort={sort}
          onSortChange={handleSortChange}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {editingSession && (
        <SessionEditModal
          session={editingSession}
          onSave={handleUpdateSession}
          onCancel={() => setEditingSession(null)}
          onToast={showToast}
        />
      )}

      {deletingSession && (
        <SessionDeleteConfirm
          session={deletingSession}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingSession(null)}
          onToast={showToast}
        />
      )}

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: "#0f172a",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: "9999px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.4)",
          }}
        >
          {toast}
        </div>
      )}
>>>>>>> theirs
    </div>
  );
};
=======
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import { SessionProvider } from './context/SessionContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './router';

const App = () => (
  <ThemeProvider>
    <SessionProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </BrowserRouter>
    </SessionProvider>
  </ThemeProvider>
);
>>>>>>> theirs

export default App;
