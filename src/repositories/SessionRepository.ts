import {
  CreateSessionInput,
  Session,
  SessionId,
  UpdateSessionInput,
} from '../../types';

const STORAGE_KEY = 'time-tracker:sessions';

let inMemorySessions: Session[] = [];

const generateId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `session-${Math.random().toString(36).slice(2, 11)}`;
};

const read = (): Session[] => {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return [...inMemorySessions];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as Session[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Failed to read sessions from localStorage', error);
    return [];
  }
};

const write = (sessions: Session[]) => {
  inMemorySessions = [...sessions];

  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.warn('Failed to write sessions to localStorage', error);
  }
};

const getAll = async (): Promise<Session[]> => {
  const sessions = read();
  inMemorySessions = [...sessions];
  return sessions;
};

const create = async (input: CreateSessionInput): Promise<Session> => {
  const next: Session = {
    ...input,
    id: generateId(),
  };

  const sessions = [...read(), next];
  write(sessions);

  return next;
};

const update = async (
  id: SessionId,
  updates: UpdateSessionInput,
): Promise<Session> => {
  const sessions = read();
  const nextSessions = sessions.map((session) =>
    session.id === id ? { ...session, ...updates, id } : session,
  );
  const updated = nextSessions.find((session) => session.id === id);

  if (!updated) {
    throw new Error(`Session with id "${id}" not found`);
  }

  write(nextSessions);

  return updated;
};

const remove = async (id: SessionId): Promise<void> => {
  const sessions = read();
  const nextSessions = sessions.filter((session) => session.id !== id);
  write(nextSessions);
};

export const SessionRepository = {
  getAll,
  create,
  update,
  remove,
};
