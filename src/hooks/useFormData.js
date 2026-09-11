import { useEffect, useRef, useState } from "react";

/**
 * useFormData
 * @param {Object} initialData 初始表單資料
 * @param {Object} asyncDependencies 非同步的依賴項資料
 */
export function useFormData(initialData = {}, asyncDependencies = {}) {
  const [formData, setFormData] = useState(initialData);
  const seededKeys = useRef(new Set());

  const getOnFormChange = (key) => {
    return (value) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    };
  };

  useEffect(() => {
    Object.entries(asyncDependencies).forEach(([key, value]) => {
      if (value !== undefined && !seededKeys.current.has(key)) {
        setFormData((prev) => ({ ...prev, [key]: value }));
        seededKeys.current.add(key);
      }
    });
  }, Object.values(asyncDependencies));

  return [formData, getOnFormChange];
}
