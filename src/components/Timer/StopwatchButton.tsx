import { useMemo } from 'react';

type StopwatchButtonProps = {
  running: boolean;
  onStart: () => void;
  onStop: () => void;
  className?: string;
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

const StopwatchButton = ({ running, onStart, onStop, className }: StopwatchButtonProps) => {
  const { label, action, variant } = useMemo(() => {
    if (running) {
      return {
        label: 'Stop timer',
        action: onStop,
        variant: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
      };
    }

    return {
      label: 'Start timer',
      action: onStart,
      variant: 'bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500',
    };
  }, [running, onStart, onStop]);

  return (
    <button
      type="button"
      onClick={action}
      className={cx(
        'rounded-lg px-6 py-3 text-lg font-semibold text-white shadow transition focus:outline-none focus-visible:ring focus-visible:ring-offset-2',
        variant,
        className,
      )}
      aria-pressed={running}
      aria-live="polite"
      aria-label={label}
    >
      {running ? 'Stop' : 'Start'}
    </button>
  );
};

export default StopwatchButton;
