import { useId } from "react";
import styles from "./Textarea.module.scss";

interface TextareaProps {
  /** 標題 */
  label: string;
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

function Textarea(props: TextareaProps) {
  const {
    label,
    value,
    placeholder = "",
    maxLength = 300,
    isRequired = false,
    isInvalid = false,
    onChange,
  } = props;
  const textareaId = useId();

  return (
    <div className={styles.textareaWrapper}>
      <label htmlFor={textareaId}>
        <span className={styles.textareaTitle}>{label}</span>
        {isRequired && <span className={styles.required}>*</span>}
      </label>
      {isInvalid && <span className={styles.invalidText}>Can't be empty</span>}
      <textarea
        id={textareaId}
        className={styles.textarea}
        data-invalid={isInvalid ? "invalid" : ""}
        rows={5}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Textarea;
