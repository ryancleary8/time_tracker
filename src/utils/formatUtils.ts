import type { ISODateString, ISODateTimeString } from "../types/common";

/**
 * Formats a date into a locale-aware string.
 *
 * @example
 * formatDate("2023-01-01T00:00:00.000Z") // e.g. "Jan 1, 2023"
 */
export function formatDate(
  input: Date | ISODateTimeString | ISODateString,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" },
  locale?: string
): string {
  const date = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Formats a time range such as "09:00 – 10:30".
 *
 * @example
 * formatTimeRange("2023-01-01T09:00:00.000Z", "2023-01-01T10:30:00.000Z")
 */
export function formatTimeRange(
  start: ISODateTimeString,
  end?: ISODateTimeString,
  locale?: string,
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" }
): string {
  const startDate = new Date(start);
  const formatter = new Intl.DateTimeFormat(locale, options);
  const formattedStart = formatter.format(startDate);

  if (!end) {
    return `${formattedStart} – …`;
  }

  const endDate = new Date(end);
  const formattedEnd = formatter.format(endDate);
  return `${formattedStart} – ${formattedEnd}`;
}

/**
 * Converts minutes to an `HH:MM` string.
 *
 * @example
 * minutesToHHMM(90) // "01:30"
 */
export function minutesToHHMM(totalMinutes: number): string {
  const safeMinutes = Math.max(0, Math.floor(totalMinutes));
  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedHours = hours.toString().padStart(2, "0");
  return `${paddedHours}:${paddedMinutes}`;
}
