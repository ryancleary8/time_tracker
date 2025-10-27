import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type Initializer<T> = T | (() => T);

type ValueUpdater<T> = T | ((previous: T) => T);

const resolveValue = <T>(value: Initializer<T>): T =>
  typeof value === 'function' ? (value as () => T)() : value;

const resolveNext = <T>(value: ValueUpdater<T>, previous: T): T =>
  typeof value === 'function' ? (value as (prev: T) => T)(previous) : value;

export const useLocalStorage = <T>(
  key: string,
  initialValue: Initializer<T>,
): readonly [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return resolveValue(initialValue);
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item) as T;
      }
    } catch (error) {
      console.warn(`Unable to read localStorage key "${key}"`, error);
    }

    return resolveValue(initialValue);
  });

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (value) => {
      setStoredValue((previous) => {
        const next = resolveNext(value, previous);

        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(next));
          } catch (error) {
            console.warn(`Unable to write localStorage key "${key}"`, error);
          }
        }

        return next;
      });
    },
    [key],
  );

  return [storedValue, setValue] as const;
};
