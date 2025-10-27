import type { ISODateTimeString } from "./common";

/**
 * Represents a user-defined category used to classify sessions.
 */
export interface Category {
  /** Unique identifier for the category. */
  id: string;
  /** Human readable category name. */
  name: string;
  /** Hex color used when displaying the category. */
  color: string;
  /** Optional keyboard shortcut identifier (e.g. "Ctrl+1"). */
  shortcut?: string;
  /** Optional description providing additional context. */
  description?: string;
  /** Timestamp when the category was created. */
  createdAt: ISODateTimeString;
  /** Timestamp when the category was last updated. */
  updatedAt: ISODateTimeString;
}
