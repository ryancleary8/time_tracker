import { useEffect, useMemo, useState } from 'react';
import QuickCategoryPicker from '../components/Timer/QuickCategoryPicker';
import SessionForm from '../components/Timer/SessionForm';
import Stopwatch from '../components/Timer/Stopwatch';
import { useSessions } from '../context/SessionContext';
import type { Session } from '../types';

const TimerPage = () => {
  const {
    activeTimer,
    categories,
    defaultCategory,
    startTimer,
    stopTimer,
    updateSession,
  } = useSessions();
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [pendingSession, setPendingSession] = useState<Session | null>(null);

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) {
        return;
      }
      if (event.code === 'Space') {
        event.preventDefault();
        if (activeTimer) {
          const session = stopTimer();
          if (session) {
            setPendingSession(session);
          }
        } else {
          startTimer(selectedCategory);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTimer, selectedCategory, startTimer, stopTimer]);

  const isRunning = Boolean(activeTimer);
  const startedAt = useMemo(() => activeTimer?.start ?? null, [activeTimer]);

  const handleStop = () => {
    const session = stopTimer();
    if (session) {
      setPendingSession(session);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Stopwatch
          isRunning={isRunning}
          startedAt={startedAt}
          onStart={() => startTimer(selectedCategory)}
          onStop={handleStop}
        />
      </div>
      <div className="space-y-6">
        <QuickCategoryPicker
          categories={categories}
          selected={selectedCategory}
          onSelect={(category) => setSelectedCategory(category)}
        />
      </div>
      {pendingSession && (
        <SessionForm
          session={pendingSession}
          categories={categories}
          onSave={(updates) => updateSession(pendingSession.id, updates)}
          onClose={() => setPendingSession(null)}
        />
      )}
    </div>
  );
};

export default TimerPage;
