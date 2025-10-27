import { db } from './db';
import { migrate } from './migrations';
import type { Session } from '../../types/session';

const SESSIONS_KEY = 'sessions';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toSession = (value: unknown): Session | undefined => {
  if (!isRecord(value)) {
    return undefined;
  }

  const { id, startedAt } = value;

  if (typeof id !== 'string' || id.trim() === '') {
    return undefined;
  }

  if (typeof startedAt !== 'string' || startedAt.trim() === '') {
    return undefined;
  }

  const session: Session = {
    id,
    startedAt,
  };

  if (typeof value.endedAt === 'string') {
    session.endedAt = value.endedAt;
  }

  if (typeof value.description === 'string') {
    session.description = value.description;
  }

  if (typeof value.categoryId === 'string') {
    session.categoryId = value.categoryId;
  }

  if (typeof value.createdAt === 'string') {
    session.createdAt = value.createdAt;
  }

  if (typeof value.updatedAt === 'string') {
    session.updatedAt = value.updatedAt;
  }

  return session;
};

const readSessions = (): Session[] => {
  const raw = db.getJSON<unknown>(SESSIONS_KEY);

  if (!Array.isArray(raw)) {
    return [];
  }

  const deduped = new Map<string, Session>();

  for (const candidate of raw) {
    const session = toSession(candidate);

    if (session) {
      deduped.set(session.id, session);
    }
  }

  return Array.from(deduped.values());
};

const writeSessions = (sessions: Session[]) => {
  db.setJSON(SESSIONS_KEY, sessions);
};

const sortByStartedAtDesc = (sessions: Session[]): Session[] =>
  [...sessions].sort((a, b) => {
    const aTime = Date.parse(a.startedAt);
    const bTime = Date.parse(b.startedAt);

    if (Number.isFinite(aTime) && Number.isFinite(bTime)) {
      return bTime - aTime;
    }

    if (Number.isFinite(bTime)) {
      return 1;
    }

    if (Number.isFinite(aTime)) {
      return -1;
    }

    return b.startedAt.localeCompare(a.startedAt);
  });

const ensureMigrated = (() => {
  let resolved = false;
  let inFlight: Promise<void> | null = null;

  return async () => {
    if (resolved) {
      return;
    }

    if (!inFlight) {
      inFlight = migrate().then(() => {
        resolved = true;
      });
    }

    try {
      await inFlight;
    } finally {
      inFlight = null;
    }
  };
})();

export interface SessionRepository {
  getAll(): Promise<Session[]>;
  getById(id: string): Promise<Session | undefined>;
  add(session: Session): Promise<void>;
  update(session: Session): Promise<void>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}

const repository: SessionRepository = {
  async getAll() {
    await ensureMigrated();
    const sessions = readSessions();
    return sortByStartedAtDesc(sessions);
  },

  async getById(id: string) {
    await ensureMigrated();
    if (typeof id !== 'string' || id.trim() === '') {
      return undefined;
    }

    const sessions = readSessions();
    return sessions.find((session) => session.id === id);
  },

  async add(session: Session) {
    await ensureMigrated();
    const sessions = readSessions();

    if (sessions.some((existing) => existing.id === session.id)) {
      throw new Error(`Session with id "${session.id}" already exists.`);
    }

    sessions.push(session);
    writeSessions(sessions);
  },

  async update(session: Session) {
    await ensureMigrated();
    const sessions = readSessions();
    const index = sessions.findIndex((existing) => existing.id === session.id);

    if (index === -1) {
      throw new Error(`Session with id "${session.id}" does not exist.`);
    }

    sessions[index] = session;
    writeSessions(sessions);
  },

  async remove(id: string) {
    await ensureMigrated();
    const sessions = readSessions();
    const filtered = sessions.filter((session) => session.id !== id);
    writeSessions(filtered);
  },

  async clear() {
    await ensureMigrated();
    writeSessions([]);
  },
};

export const sessionRepository: SessionRepository = repository;
