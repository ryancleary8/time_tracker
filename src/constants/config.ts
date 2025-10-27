/**
 * Immutable configuration values for the application.
 */
export const APP_CONFIG = {
  appName: "FocusTime",
  defaultSessionDurationMinutes: 25,
  maxSessionNotesLength: 2000,
  storageKeyPrefix: "focus-time",
} as const;
