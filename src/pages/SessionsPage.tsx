import { useEffect, useMemo, useState } from 'react';
import SessionFilters from '../components/Sessions/SessionFilters';
import SessionList from '../components/Sessions/SessionList';
import SessionForm from '../components/Timer/SessionForm';
import { useSessions } from '../context/SessionContext';
import type { Session } from '../types';

const SessionsPage = () => {
  const {
    sessions,
    categories,
    selectedSessionId,
    selectSession,
    updateSession,
    deleteSession,
  } = useSessions();
  const [filters, setFilters] = useState({ category: 'all', from: '', to: '' });
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      if (filters.category !== 'all' && session.category !== filters.category) {
        return false;
      }
      if (filters.from) {
        if (new Date(session.start) < new Date(`${filters.from}T00:00:00`)) {
          return false;
        }
      }
      if (filters.to) {
        if (new Date(session.end) > new Date(`${filters.to}T23:59:59`)) {
          return false;
        }
      }
      return true;
    });
  }, [sessions, filters]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
        return;
      }
      if (event.code === 'KeyE') {
        event.preventDefault();
        const session = filteredSessions[0];
        if (session) {
          setEditingSession(session);
        }
      }
      if (event.code === 'Delete') {
        event.preventDefault();
        if (selectedSessionId) {
          deleteSession(selectedSessionId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredSessions, selectedSessionId, deleteSession]);

  return (
    <div className="space-y-6">
      <SessionFilters
        category={filters.category}
        from={filters.from}
        to={filters.to}
        categories={categories}
        onChange={setFilters}
      />
      <SessionList
        sessions={filteredSessions}
        selectedId={selectedSessionId}
        onSelect={(session) => selectSession(session.id)}
        onEdit={(session) => setEditingSession(session)}
        onDelete={(session) => deleteSession(session.id)}
      />
      {editingSession && (
        <SessionForm
          session={editingSession}
          categories={categories}
          onSave={(updates) => updateSession(editingSession.id, updates)}
          onClose={() => setEditingSession(null)}
        />
      )}
    </div>
  );
};

export default SessionsPage;
