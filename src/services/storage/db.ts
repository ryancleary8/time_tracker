const STORAGE_PREFIX = 'ttw:';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

const memoryStorage = (): StorageLike => {
  const store = new Map<string, string>();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key, value) {
      store.set(key, value);
    },
    removeItem(key) {
      store.delete(key);
    },
  };
};

const resolveStorage = (): StorageLike => {
  try {
    if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
      const candidate = (globalThis as typeof globalThis & { localStorage?: Storage }).localStorage;
      if (candidate) {
        return candidate;
      }
    }
  } catch (error) {
    // Ignore and fall back to in-memory storage.
  }

  return memoryStorage();
};

const storage = resolveStorage();

const prefixKey = (key: string) => `${STORAGE_PREFIX}${key}`;

export const db = {
  getJSON<T>(key: string): T | undefined {
    const namespacedKey = prefixKey(key);
    try {
      const value = storage.getItem(namespacedKey);
      if (value == null || value === '') {
        return undefined;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      // Remove invalid data to prevent repeated parse failures.
      try {
        storage.removeItem(namespacedKey);
      } catch (removeError) {
        // Ignore removal errors.
      }
      return undefined;
    }
  },

  setJSON<T>(key: string, value: T): void {
    const namespacedKey = prefixKey(key);
    try {
      const serialised = JSON.stringify(value);
      storage.setItem(namespacedKey, serialised);
    } catch (error) {
      // Ignore write errors for now; could be quota exceeded or non-serialisable value.
    }
  },

  remove(key: string): void {
    try {
      storage.removeItem(prefixKey(key));
    } catch (error) {
      // Ignore removal errors.
    }
  },
};

export type Database = typeof db;
