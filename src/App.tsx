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
    </div>
  );
};

export default App;
