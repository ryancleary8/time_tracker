import { db } from './db';
import type { Session } from '../../types/session';

const VERSION_KEY = 'version';
const CURRENT_VERSION = 1;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const normaliseSession = (value: unknown): Session | undefined => {
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

  const createdAt = typeof value.createdAt === 'string' ? value.createdAt : session.startedAt;
  const updatedAt = typeof value.updatedAt === 'string' ? value.updatedAt : createdAt;

  session.createdAt = createdAt;
  session.updatedAt = updatedAt;

  return session;
};

const migrateToVersion1 = () => {
  const stored = db.getJSON<unknown>('sessions');

  if (!Array.isArray(stored)) {
    db.setJSON<Session[]>('sessions', []);
    return;
  }

  const migratedSessions = stored
    .map(normaliseSession)
    .filter((session): session is Session => Boolean(session));

  db.setJSON('sessions', migratedSessions);
};

let migrationPromise: Promise<void> | null = null;

export const migrate = async (): Promise<void> => {
  if (migrationPromise) {
    return migrationPromise;
  }

  migrationPromise = (async () => {
    const version = db.getJSON<number>(VERSION_KEY) ?? 0;

    if (version >= CURRENT_VERSION) {
      return;
    }

    if (version < 1) {
      migrateToVersion1();
    }

    db.setJSON<number>(VERSION_KEY, CURRENT_VERSION);
  })();

  try {
    await migrationPromise;
  } finally {
    migrationPromise = null;
  }
};
