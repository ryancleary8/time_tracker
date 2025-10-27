<<<<<<< ours
import type { Category } from "../types/category";

const BASE_TIMESTAMP = "2023-01-01T00:00:00.000Z";

/**
 * Default set of categories used to seed the application.
 */
export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "development",
    name: "Development",
    color: "#3B82F6",
    shortcut: "ctrl+1",
    description: "Coding, debugging, and technical implementation work.",
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
  },
  {
    id: "design",
    name: "Design",
    color: "#EC4899",
    shortcut: "ctrl+2",
    description: "UI, UX, and visual design activities.",
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
  },
  {
    id: "meetings",
    name: "Meetings",
    color: "#F59E0B",
    shortcut: "ctrl+3",
    description: "Synchronous collaboration and communication.",
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
  },
  {
    id: "research",
    name: "Research",
    color: "#10B981",
    shortcut: "ctrl+4",
    description: "Investigation, exploration, and learning time.",
    createdAt: BASE_TIMESTAMP,
    updatedAt: BASE_TIMESTAMP,
  },
=======
export type Category = {
  id: string;
  name: string;
  accent: string;
};

export const categories: Category[] = [
  { id: 'deep-work', name: 'Deep Work', accent: '#2563eb' },
  { id: 'meeting', name: 'Meeting', accent: '#16a34a' },
  { id: 'break', name: 'Break', accent: '#f97316' },
  { id: 'learning', name: 'Learning', accent: '#9333ea' },
>>>>>>> theirs
];
