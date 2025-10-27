import type { DurationMilliseconds, ISODateString, ISOWeekString } from "./common";
import type { Session } from "./session";

/**
 * Aggregate information for a specific calendar day.
 */
export interface TimesheetByDay {
  /** Calendar day represented by the entry. */
  date: ISODateString;
  /** Total duration for all sessions within the day. */
  totalDurationMs: DurationMilliseconds;
  /** Sessions that occurred during the day. */
  sessions: Session[];
}

/**
 * Aggregate information for a week following ISO week numbering.
 */
export interface TimesheetByWeek {
  /** ISO formatted week key (YYYY-Www). */
  week: ISOWeekString;
  /** ISO date string representing the Monday starting the week. */
  startDate: ISODateString;
  /** ISO date string representing the Sunday ending the week. */
  endDate: ISODateString;
  /** Total duration for all sessions within the week. */
  totalDurationMs: DurationMilliseconds;
  /** Sessions that occurred during the week. */
  sessions: Session[];
}

/**
 * Aggregate information grouped by category id.
 */
export interface TimesheetByCategory {
  /** Identifier of the category. */
  categoryId: string;
  /** Total duration assigned to the category. */
  totalDurationMs: DurationMilliseconds;
  /** Sessions associated with the category. */
  sessions: Session[];
}

/**
 * Composite timesheet structure to be consumed by views.
 */
export interface TimesheetSummary {
  byDay: TimesheetByDay[];
  byWeek: TimesheetByWeek[];
  byCategory: TimesheetByCategory[];
  totalDurationMs: DurationMilliseconds;
}
