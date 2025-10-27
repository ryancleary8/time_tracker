import { format, formatISO } from 'date-fns';
import type { Session } from '../types';

export const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const createSession = (
  start: Date,
  end: Date,
  category: string,
  notes?: string
): Session => {
  const durationMs = end.getTime() - start.getTime();
  return {
    id: `${start.getTime()}-${end.getTime()}`,
    start: start.toISOString(),
    end: end.toISOString(),
    durationMs,
    category,
    notes,
  };
};

export const formatDisplayDate = (iso: string) =>
  format(new Date(iso), 'MMM d, yyyy h:mm a');

export const getWeekKey = (iso: string) => format(new Date(iso), "yyyy-'W'II");

export const formatDateOnly = (iso: string) => format(new Date(iso), 'yyyy-MM-dd');

export const formatISODate = (iso: string) => formatISO(new Date(iso), { representation: 'date' });
