import type { DurationMilliseconds, ISODateTimeString } from "./common";

/**
 * Represents the current state of the timer UI.
 */
export interface TimerState {
  /** Whether the timer is actively counting up. */
  isRunning: boolean;
  /** ISO timestamp of when the timer last started. */
  startedAt?: ISODateTimeString;
  /** Accumulated elapsed time in milliseconds when paused. */
  elapsedMs: DurationMilliseconds;
}

/**
 * Controls exposed by the timer to start, pause, reset, or persist the session.
 */
export interface TimerControls {
  start: () => void;
  pause: () => void;
  reset: () => void;
  complete: () => void;
}
