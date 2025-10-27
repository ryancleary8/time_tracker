import type { DurationMilliseconds, ISODateTimeString } from "../types/common";

/**
 * Pads a number with leading zeros to ensure at least two digits.
 *
 * @example
 * pad2(4) // "04"
 */
export function pad2(value: number): string {
  const normalized = Math.trunc(Math.abs(value));
  return normalized >= 10 ? String(normalized) : `0${normalized}`;
}

/**
 * Clamps a number between the provided minimum and maximum values.
 *
 * @example
 * clamp(10, 0, 5) // 5
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError("Minimum cannot be greater than maximum.");
  }

  return Math.min(Math.max(value, min), max);
}

/**
 * Formats a duration (milliseconds) into a human-friendly `HH:MM:SS` string.
 *
 * @example
 * formatDuration(65_000) // "00:01:05"
 */
export function formatDuration(durationMs: DurationMilliseconds): string {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

/**
 * Returns the absolute difference between two ISO timestamps in milliseconds.
 *
 * @example
 * msBetween("2023-01-01T00:00:00.000Z", "2023-01-01T00:01:00.000Z") // 60000
 */
export function msBetween(a: ISODateTimeString, b: ISODateTimeString): DurationMilliseconds {
  const diff = new Date(a).getTime() - new Date(b).getTime();
  return Math.abs(diff);
}

/**
 * Converts a `Date` or millisecond timestamp to an ISO 8601 string.
 *
 * @example
 * toISO(new Date("2023-01-01T00:00:00Z")) // "2023-01-01T00:00:00.000Z"
 */
export function toISO(date: Date | number): ISODateTimeString {
  const instance = date instanceof Date ? date : new Date(date);
  return instance.toISOString();
}

/**
 * Creates a `Date` object from an ISO 8601 string.
 *
 * @example
 * fromISO("2023-01-01T00:00:00.000Z").getUTCFullYear() // 2023
 */
export function fromISO(value: ISODateTimeString): Date {
  return new Date(value);
}
