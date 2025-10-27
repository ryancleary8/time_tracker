<<<<<<< ours
import type { ISODateString, ISODateTimeString, ISOWeekString } from "../types/common";
import { pad2 } from "./timeUtils";

function normalizeDate(input: Date | ISODateTimeString | ISODateString): Date {
  return input instanceof Date ? new Date(input.getTime()) : new Date(input);
}

/**
 * Determines whether the provided date falls on the current calendar day.
 *
 * @example
 * isToday(new Date()) // true (on the current day)
 */
export function isToday(input: Date | ISODateTimeString): boolean {
  const date = normalizeDate(input);
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * Returns a new `Date` set to the start of the day (00:00:00.000) for the given input.
 */
export function startOfDay(input: Date | ISODateTimeString | ISODateString): Date {
  const date = normalizeDate(input);
  const result = new Date(date.getTime());
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Returns a new `Date` representing the end of the day (23:59:59.999).
 */
export function endOfDay(input: Date | ISODateTimeString | ISODateString): Date {
  const start = startOfDay(input);
  const result = new Date(start.getTime());
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Returns the ISO-8601 week-aligned Monday for the provided date.
 *
 * @example
 * startOfWeek("2023-03-08T10:00:00.000Z").toISOString() // Monday of the same ISO week
 */
export function startOfWeek(input: Date | ISODateTimeString | ISODateString): Date {
  const date = startOfDay(input);
  const day = date.getDay();
  const diff = (day + 6) % 7; // convert Sunday=0..Saturday=6 to Monday based index
  const result = new Date(date.getTime());
  result.setDate(result.getDate() - diff);
  return result;
}

/**
 * Builds an ISO week key in the format `YYYY-Www` for the given date.
 *
 * @example
 * weekKey("2023-01-04T00:00:00.000Z") // "2023-W01"
 */
export function weekKey(input: Date | ISODateTimeString | ISODateString): ISOWeekString {
  const date = normalizeDate(input);
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utcDate.getUTCDay() || 7; // convert Sunday(0) to 7
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((utcDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${utcDate.getUTCFullYear()}-W${pad2(weekNo)}`;
}

/**
 * Determines if two inputs fall on the same calendar day.
 */
export function sameDay(a: Date | ISODateTimeString, b: Date | ISODateTimeString): boolean {
  const first = normalizeDate(a);
  const second = normalizeDate(b);
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}
=======
export const MS_PER_MINUTE = 60 * 1000;
export const MS_PER_HOUR = 60 * MS_PER_MINUTE;
export const MS_PER_DAY = 24 * MS_PER_HOUR;

export type DateInput = Date | string | number;

export const toDate = (value: DateInput): Date => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  return new Date(value);
};

export const startOfDay = (value: DateInput): Date => {
  const date = toDate(value);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const endOfDay = (value: DateInput): Date => {
  const date = toDate(value);
  date.setHours(23, 59, 59, 999);
  return date;
};

export const startOfWeek = (value: DateInput, weekStartsOn = 1): Date => {
  const date = startOfDay(value);
  const day = date.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  return new Date(date.getTime() - diff * MS_PER_DAY);
};

export const endOfWeek = (value: DateInput, weekStartsOn = 1): Date => {
  const start = startOfWeek(value, weekStartsOn);
  return new Date(start.getTime() + 6 * MS_PER_DAY + (MS_PER_DAY - 1));
};

export const clampToRange = (value: Date, start: Date, end: Date): Date => {
  if (value < start) return start;
  if (value > end) return end;
  return value;
};

export const isWithinRange = (value: Date, start: Date, end: Date): boolean => {
  return value.getTime() >= start.getTime() && value.getTime() <= end.getTime();
};

const dayFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
});

const weekFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

export const formatDayLabel = (value: Date): string => {
  return `${weekdayFormatter.format(value)} ${dayFormatter.format(value)}`;
};

export const formatWeekRangeLabel = (start: Date, end: Date): string => {
  return `${weekFormatter.format(start)} - ${weekFormatter.format(end)}`;
};

export const formatDuration = (ms: number): string => {
  if (!Number.isFinite(ms) || ms <= 0) {
    return '0h 00m';
  }
  const totalMinutes = Math.round(ms / MS_PER_MINUTE);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

export const formatDurationCompact = (ms: number): string => {
  if (!Number.isFinite(ms) || ms <= 0) {
    return '00:00';
  }
  const totalMinutes = Math.round(ms / MS_PER_MINUTE);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
>>>>>>> theirs
