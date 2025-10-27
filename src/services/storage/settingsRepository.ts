import { db } from './db';
import { migrate } from './migrations';
import type { Theme } from '../../types/settings';

const THEME_KEY = 'settings:theme';
const DEFAULT_CATEGORY_KEY = 'settings:default-category';

const ensureMigrated = (() => {
  let resolved = false;
  let inFlight: Promise<void> | null = null;

  return async () => {
    if (resolved) {
      return;
    }

    if (!inFlight) {
      inFlight = migrate().then(() => {
        resolved = true;
      });
    }

    try {
      await inFlight;
    } finally {
      inFlight = null;
    }
  };
})();

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

export const settingsRepository = {
  async getTheme(): Promise<Theme | undefined> {
    await ensureMigrated();
    const stored = db.getJSON<unknown>(THEME_KEY);
    return isTheme(stored) ? stored : undefined;
  },

  async setTheme(theme: Theme): Promise<void> {
    await ensureMigrated();
    if (!isTheme(theme)) {
      throw new Error(`Unsupported theme: ${String(theme)}`);
    }

    db.setJSON(THEME_KEY, theme);
  },

  async getDefaultCategory(): Promise<string | undefined> {
    await ensureMigrated();
    const stored = db.getJSON<unknown>(DEFAULT_CATEGORY_KEY);

    return typeof stored === 'string' && stored.trim() !== '' ? stored : undefined;
  },

  async setDefaultCategory(categoryId: string | undefined): Promise<void> {
    await ensureMigrated();

    if (typeof categoryId !== 'string' || categoryId.trim() === '') {
      db.remove(DEFAULT_CATEGORY_KEY);
      return;
    }

    db.setJSON(DEFAULT_CATEGORY_KEY, categoryId);
  },
};

export type SettingsRepository = typeof settingsRepository;
