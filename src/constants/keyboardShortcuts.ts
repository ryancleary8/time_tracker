/**
 * Representation of a keyboard shortcut configuration.
 */
export interface KeyboardShortcut {
  /** Identifier for the action triggered by the shortcut. */
  action: string;
  /** Display label for the key combination. */
  combo: string;
  /** Description explaining what the shortcut accomplishes. */
  description: string;
}

/**
 * Global keyboard shortcuts available in the time tracking app.
 */
export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  {
    action: "timer.start",
    combo: "Space",
    description: "Start or pause the active timer.",
  },
  {
    action: "timer.reset",
    combo: "Shift+Space",
    description: "Reset the active timer to zero.",
  },
  {
    action: "session.save",
    combo: "Ctrl+Enter",
    description: "Save the current session notes.",
  },
  {
    action: "navigation.timesheet",
    combo: "Ctrl+Shift+T",
    description: "Navigate to the timesheet view.",
  },
];
