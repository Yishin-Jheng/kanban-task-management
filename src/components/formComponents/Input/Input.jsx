import clsx from "clsx";
import styles from "./Input.module.scss";

/**
 * Input
 * @param {string} props.label 標題
 * @param {string} props.type 類型
 * @param {string} props.value 顯示值
 * @param {string} props.placeholder 提示文字
 * @param {number} props.maxLength 最大字數限制
 * @param {boolean} props.isRequired 是否為必填
 * @param {boolean} props.isInvalid 是否必填檢查未通過
 * @param {function} props.onChange 狀態改變時呼叫的函式
 */
function Input(props) {
  const {
    label = "",
    type = "",
    value = "",
    placeholder = "",
    maxLength = 120,
    isRequired = false,
    isInvalid = false,
    onChange = () => {},
  } = props;

  return (
    <div className={styles.inputWrapper}>
      <p>
        <span className={styles.inputTitle}>{label}</span>
        {isRequired && <span className={styles.required}>*</span>}
      </p>
      {isInvalid ? (
        <span className={styles.invalidText}>Can't be empty</span>
      ) : null}
      <input
        id={label}
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
