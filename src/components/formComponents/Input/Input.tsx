import { useId } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

interface InputProps {
  /** 標題 */
  label: string;
  /** 類型 */
  type?: "text" | "password" | "email";
  /** 顯示值 */
  value: string;
  /** 提示文字 */
  placeholder?: string;
  /** 最大字數限制 */
  maxLength?: number;
  /** 是否為必填 */
  isRequired?: boolean;
  /** 是否必填檢查未通過 */
  isInvalid?: boolean;
  /** 狀態改變時呼叫的callback */
  onChange: (value: string) => void;
}

function Input(props: InputProps) {
  const {
    label,
    type = "text",
    value,
    placeholder = "",
    maxLength = 120,
    isRequired = false,
    isInvalid = false,
    onChange,
  } = props;
  const inputId = useId();

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={inputId}>
        <span className={styles.inputTitle}>{label}</span>
      </label>
      {isRequired && <span className={styles.required}>*</span>}
      {isInvalid ? (
        <span className={styles.invalidText}>Can't be empty</span>
      ) : null}
      <input
        id={inputId}
        className={clsx(styles.input, isInvalid ? styles.invalidWrapper : "")}
        type={type}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Input;
