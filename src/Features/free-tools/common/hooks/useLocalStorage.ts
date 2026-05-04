// src/Features/free-tools/common/hooks/useLocalStorage.ts
import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (v: T | ((prev: T) => T)) => void, { remove: () => void; hydrated: boolean }] {
  const [hydrated, setHydrated] = useState(false);
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw));
    } catch {}
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          localStorage.setItem(key, JSON.stringify(v));
        } catch {}
        return v;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {}
    setValue(initialValue);
  }, [initialValue, key]);

  return [value, set, { remove, hydrated }];
}
