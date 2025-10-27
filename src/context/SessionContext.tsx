import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  CreateSessionInput,
  Session,
  SessionId,
  UpdateSessionInput,
} from '../../types';
import { SessionRepository } from '../repositories/SessionRepository';

interface SessionContextValue {
  sessions: Session[];
  addSession: (input: CreateSessionInput) => Promise<Session>;
  updateSession: (id: SessionId, updates: UpdateSessionInput) => Promise<Session>;
  removeSession: (id: SessionId) => Promise<void>;
  reload: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const loadSessions = useCallback(async () => {
    const allSessions = await SessionRepository.getAll();
    setSessions(allSessions);
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  const addSession = useCallback(async (input: CreateSessionInput) => {
    const created = await SessionRepository.create(input);
    setSessions((previous) => [...previous, created]);
    return created;
  }, []);

  const updateSession = useCallback(
    async (id: SessionId, updates: UpdateSessionInput) => {
      const updated = await SessionRepository.update(id, updates);
      setSessions((previous) =>
        previous.map((session) => (session.id === id ? updated : session)),
      );
      return updated;
    },
    [],
  );

  const removeSession = useCallback(async (id: SessionId) => {
    await SessionRepository.remove(id);
    setSessions((previous) => previous.filter((session) => session.id !== id));
  }, []);

  const reload = useCallback(async () => {
    await loadSessions();
  }, [loadSessions]);

  const value = useMemo(
    () => ({ sessions, addSession, updateSession, removeSession, reload }),
    [sessions, addSession, updateSession, removeSession, reload],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSessions = (): SessionContextValue => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSessions must be used within a SessionProvider');
  }

  return context;
};
