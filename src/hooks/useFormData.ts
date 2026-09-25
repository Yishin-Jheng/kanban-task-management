import { useEffect, useRef, useState } from "react";

type StringKeyOf<T extends object> = Extract<keyof T, string>;
type EntryOf<T extends object> = {
  [K in StringKeyOf<T>]: [K, T[K]];
}[StringKeyOf<T>];

function typedEntries<T extends object>(object: T): EntryOf<T>[] {
  return Object.entries(object) as EntryOf<T>[];
}

/**
 * useFormData
 * @param initialData 初始表單資料
 * @param asyncDependencies 非同步取得的初始值。每個 key 在第一次拿到非 undefined 的值時寫入 formData，之後的變化會被忽略。
 */
export function useFormData<FormData extends object>(
  initialData: FormData,
  asyncDependencies: Partial<FormData> = {},
) {
  const [formData, setFormData] = useState(initialData);
  const seededKeys = useRef<Set<keyof FormData>>(new Set());

  const getOnFormChange = <K extends keyof FormData>(key: K) => {
    return (value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };
  };

  useEffect(() => {
    typedEntries(asyncDependencies).forEach(([key, value]) => {
      if (value !== undefined && !seededKeys.current.has(key)) {
        setFormData((prev) => ({ ...prev, [key]: value }));
        seededKeys.current.add(key);
      }
    });
  }, Object.values(asyncDependencies));

  return [formData, getOnFormChange] as const;
}
