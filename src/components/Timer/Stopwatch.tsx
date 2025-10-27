<<<<<<< ours
import { useCallback, useEffect, useMemo, useState } from 'react';
import useTimer from '../../hooks/useTimer';
import type { Category } from '../../constants/categories';
import QuickCategoryPicker from './QuickCategoryPicker';
import StopwatchButton from './StopwatchButton';
import styles from './Timer.module.css';

type StopwatchProps = {
  onStop?: (durationMs: number) => void;
};

const pad = (value: number) => value.toString().padStart(2, '0');

const Stopwatch = ({ onStop }: StopwatchProps) => {
  const { running, elapsedMs, start, stop, reset } = useTimer();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const { hours, minutes, seconds, centiseconds } = useMemo(() => {
    const hoursFloat = Math.floor(elapsedMs / 3_600_000);
    const minutesFloat = Math.floor((elapsedMs % 3_600_000) / 60_000);
    const secondsFloat = Math.floor((elapsedMs % 60_000) / 1_000);
    const centisecondsFloat = Math.floor((elapsedMs % 1_000) / 10);

    return {
      hours: pad(hoursFloat),
      minutes: pad(minutesFloat),
      seconds: pad(secondsFloat),
      centiseconds: centisecondsFloat.toString().padStart(2, '0'),
    };
  }, [elapsedMs]);

  const handleStart = useCallback(() => {
    start();
  }, [start]);

  const handleStop = useCallback(() => {
    if (!running) {
      return;
    }

    const duration = stop();
    onStop?.(duration);
  }, [onStop, running, stop]);

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' && event.key !== ' ') {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target && target.tagName !== 'BODY') {
        return;
      }

      event.preventDefault();

      if (running) {
        handleStop();
      } else {
        handleStart();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleStart, handleStop, running]);

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-8 rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur dark:bg-slate-800/80">
      <header className="flex flex-col gap-3 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Stopwatch</h2>
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Press <kbd className="rounded border border-slate-300 bg-slate-100 px-1 py-0.5 text-xs font-semibold">Space</kbd>{' '}
          to {running ? 'pause' : 'start'} the timer.
        </p>
      </header>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-end">
          <span className={`${styles.timerFace} text-6xl font-semibold tracking-widest text-slate-900 dark:text-white sm:text-7xl md:text-8xl`}>
            {hours}:{minutes}:{seconds}
          </span>
          <span className={`${styles.milliseconds} text-sm`}>{centiseconds}</span>
        </div>
        {selectedCategory && (
          <span className="text-sm text-slate-500 dark:text-slate-300">
            Logged under <strong className="font-semibold text-slate-700 dark:text-white">{selectedCategory.name}</strong>
          </span>
        )}
      </div>

      <QuickCategoryPicker
        selectedId={selectedCategory?.id}
        onPick={(category) => setSelectedCategory(category)}
        className="justify-center"
      />

      <div className="flex flex-wrap justify-center gap-4">
        <StopwatchButton running={running} onStart={handleStart} onStop={handleStop} />
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus-visible:ring focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
        >
          Reset
        </button>
      </div>
    </section>
=======
import { useEffect, useState } from 'react';
import { formatDuration } from '../../utils/time';

interface StopwatchProps {
  isRunning: boolean;
  startedAt: number | null;
  onStart: () => void;
  onStop: () => void;
}

const Stopwatch = ({ isRunning, startedAt, onStart, onStop }: StopwatchProps) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && startedAt) {
      setElapsed(Date.now() - startedAt);
      interval = window.setInterval(() => {
        setElapsed(Date.now() - startedAt);
      }, 1000);
    } else {
      setElapsed(0);
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isRunning, startedAt]);

  const display = isRunning && startedAt ? formatDuration(elapsed) : formatDuration(0);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">Current Session</div>
      <div className="mt-3 text-5xl font-semibold text-primary-600 dark:text-primary-300" aria-live="polite">
        {display}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onStart}
          disabled={isRunning}
          className="rounded-md bg-primary-600 px-4 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Start
        </button>
        <button
          type="button"
          onClick={onStop}
          disabled={!isRunning}
          className="rounded-md border border-slate-200 px-4 py-2 text-slate-700 shadow disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:text-slate-100"
        >
          Stop
        </button>
      </div>
    </div>
>>>>>>> theirs
  );
};

export default Stopwatch;
