import {
  createContext,
<<<<<<< ours
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
=======
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Session } from '../types';
import { createSession } from '../utils/time';

interface ActiveTimerState {
  start: number;
  category: string;
}

interface SessionContextValue {
  sessions: Session[];
  activeTimer: ActiveTimerState | null;
  defaultCategory: string;
  categories: string[];
  selectedSessionId: string | null;
  startTimer: (category?: string) => void;
  stopTimer: () => Session | null;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  deleteSession: (sessionId: string) => void;
  selectSession: (sessionId: string | null) => void;
  setDefaultCategory: (category: string) => void;
  exportSessions: () => string;
}

const DEFAULT_CATEGORIES = ['Development', 'Design', 'Meeting', 'Research', 'Support'];

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTimer, setActiveTimer] = useState<ActiveTimerState | null>(null);
  const [defaultCategory, setDefaultCategory] = useState<string>(DEFAULT_CATEGORIES[0]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const startTimer = useCallback(
    (category?: string) => {
      setActiveTimer((current) => {
        if (current) {
          return current;
        }
        return {
          start: Date.now(),
          category: category ?? defaultCategory,
        };
      });
    },
    [defaultCategory]
  );

  const stopTimer = useCallback(() => {
    if (!activeTimer) {
      return null;
    }
    const start = new Date(activeTimer.start);
    const end = new Date();
    const session = createSession(start, end, activeTimer.category);
    setSessions((prev) => [session, ...prev]);
    setActiveTimer(null);
    setSelectedSessionId(session.id);
    return session;
  }, [activeTimer]);

  const updateSession = useCallback((sessionId: string, updates: Partial<Session>) => {
    setSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? { ...session, ...updates } : session))
    );
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    setSelectedSessionId((current) => (current === sessionId ? null : current));
  }, []);

  const selectSession = useCallback((sessionId: string | null) => {
    setSelectedSessionId(sessionId);
  }, []);

  const exportSessions = useCallback(() => JSON.stringify(sessions, null, 2), [sessions]);

  const value = useMemo<SessionContextValue>(
    () => ({
      sessions,
      activeTimer,
      defaultCategory,
      categories: DEFAULT_CATEGORIES,
      selectedSessionId,
      startTimer,
      stopTimer,
      updateSession,
      deleteSession,
      selectSession,
      setDefaultCategory,
      exportSessions,
    }),
    [
      sessions,
      activeTimer,
      defaultCategory,
      selectedSessionId,
      startTimer,
      stopTimer,
      updateSession,
      deleteSession,
      selectSession,
      setDefaultCategory,
      exportSessions,
    ]
>>>>>>> theirs
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

<<<<<<< ours
export const useSessions = (): SessionContextValue => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSessions must be used within a SessionProvider');
  }

=======
export const useSessions = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessions must be used within a SessionProvider');
  }
>>>>>>> theirs
  return context;
};
