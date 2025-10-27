import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimerReturn = {
  running: boolean;
  elapsedMs: number;
  start: () => void;
  stop: () => number;
  reset: () => void;
};

const STORAGE_KEY = 'time-tracker.stopwatch-anchor';

const hasWindow = () => typeof window !== 'undefined';

const getStoredAnchor = (): number | null => {
  if (!hasWindow()) {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  const parsed = Number.parseInt(stored, 10);
  return Number.isFinite(parsed) ? parsed : null;
};

const setStoredAnchor = (anchor: number | null) => {
  if (!hasWindow()) {
    return;
  }

  if (anchor == null) {
    window.localStorage.removeItem(STORAGE_KEY);
  } else {
    window.localStorage.setItem(STORAGE_KEY, String(anchor));
  }
};

export const useTimer = (): UseTimerReturn => {
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const anchorRef = useRef<number | null>(null);

  // Restore running state if an anchor is persisted.
  useEffect(() => {
    const storedAnchor = getStoredAnchor();
    if (storedAnchor != null) {
      anchorRef.current = storedAnchor;
      setRunning(true);
      setElapsedMs(Date.now() - storedAnchor);
    }
  }, []);

  // Tick every 100ms while running.
  useEffect(() => {
    if (!running) {
      return;
    }

    const tick = () => {
      if (anchorRef.current != null) {
        setElapsedMs(Date.now() - anchorRef.current);
      }
    };

    // Update immediately to avoid waiting for the first interval.
    tick();
    const intervalId = window.setInterval(tick, 100);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [running]);

  const start = useCallback(() => {
    if (running) {
      return;
    }

    const now = Date.now();
    const anchor = now - elapsedMs;
    anchorRef.current = anchor;
    setStoredAnchor(anchor);
    setRunning(true);
    setElapsedMs(now - anchor);
  }, [elapsedMs, running]);

  const stop = useCallback(() => {
    const now = Date.now();
    const anchor = anchorRef.current;
    const finalElapsed = anchor != null ? now - anchor : elapsedMs;

    anchorRef.current = null;
    setStoredAnchor(null);
    setRunning(false);
    setElapsedMs(finalElapsed);

    return finalElapsed;
  }, [elapsedMs]);

  const reset = useCallback(() => {
    anchorRef.current = null;
    setStoredAnchor(null);
    setRunning(false);
    setElapsedMs(0);
  }, []);

  return { running, elapsedMs, start, stop, reset };
};

export default useTimer;
