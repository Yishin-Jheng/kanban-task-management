import { useRef } from "react";

export function useFormData(initialData = {}) {
  const formData = useRef(initialData);
  const getFormData = () => formData;
  const handleFormChange = (formData, key) => {
    return (value) => {
      formData.current = { ...formData.current, [key]: value };
    };
  };

  return [getFormData, handleFormChange];
}
