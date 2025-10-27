import type { Session } from "../types/session";

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function isIsoDate(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  return !Number.isNaN(Date.parse(value));
}

/**
 * Validates that an arbitrary value satisfies the {@link Session} contract.
 *
 * @example
 * validateSession(candidate).valid // true | false
 */
export function validateSession(candidate: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof candidate !== "object" || candidate === null) {
    return { valid: false, errors: ["Value must be an object."] };
  }

  const session = candidate as Partial<Session>;

  const requiredStringFields: Array<keyof Session> = [
    "id",
    "startedAt",
    "category",
    "createdAt",
    "updatedAt",
  ];

  for (const field of requiredStringFields) {
    const value = session[field];
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(`Field \"${String(field)}\" is required and must be a non-empty string.`);
    }
  }

  if (session.durationMs !== undefined && typeof session.durationMs !== "number") {
    errors.push("Field \"durationMs\" must be a number when provided.");
  }

  if (session.notes !== undefined && typeof session.notes !== "string") {
    errors.push("Field \"notes\" must be a string when provided.");
  }

  const isoFields: Array<keyof Session> = ["startedAt", "endedAt", "createdAt", "updatedAt"];
  for (const field of isoFields) {
    const value = session[field];
    if (value !== undefined) {
      if (typeof value !== "string" || !isIsoDate(value)) {
        errors.push(`Field \"${String(field)}\" must be a valid ISO-8601 string.`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
