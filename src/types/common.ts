/**
 * Shared type aliases and helpers used across time tracking domain types.
 */

/**
 * Represents a date-time string in ISO 8601 format.
 *
 * @example
 * const createdAt: ISODateTimeString = "2023-01-01T09:30:00.000Z";
 */
export type ISODateTimeString = string;

/**
 * Represents a calendar date (YYYY-MM-DD) encoded as an ISO 8601 string.
 *
 * @example
 * const day: ISODateString = "2023-01-01";
 */
export type ISODateString = string;

/**
 * Represents an ISO week string in the form `YYYY-Www`.
 *
 * @example
 * const currentWeek: ISOWeekString = "2023-W09";
 */
export type ISOWeekString = string;

/**
 * Represents a duration in milliseconds.
 *
 * @example
 * const duration: DurationMilliseconds = 90_000; // 1.5 minutes
 */
export type DurationMilliseconds = number;

/**
 * Basic identifiable entity contract.
 */
export interface Identifiable {
  /** Unique identifier for the entity. */
  id: string;
}
