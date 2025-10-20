import { useState } from 'react';

export function useLocalStorageState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const initialState = localStorage.getItem(key);
      return initialState ? (JSON.parse(initialState) as T) : initial;
    } catch {
      return initial;
    }
  });

  const setAndStore = (value: T | ((prev: T) => T)) => {
    setState(prev => {
      const next = typeof value === 'function' ? (value as (p: T) => T)(prev) : value;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return [state, setAndStore] as const;
}
