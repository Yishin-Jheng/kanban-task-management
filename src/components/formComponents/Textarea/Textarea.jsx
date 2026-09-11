import styles from "./Textarea.module.scss";

/**
 * Textarea
 * @param {string} props.label 標題
 * @param {string} props.value 顯示值
 * @param {string} props.placeholder 提示文字
 * @param {number} props.maxLength 最大字數限制
 * @param {boolean} props.isRequired 是否為必填
 * @param {boolean} props.isInvalid 是否必填檢查未通過
 * @param {function} props.onChange 狀態改變時呼叫的函式
 */
function Textarea(props) {
  const {
    label = "",
    value = "",
    placeholder = "",
    maxLength = 300,
    isRequired = false,
    isInvalid = false,
    onChange = () => {},
  } = props;

  return (
    <div className={styles.textareaWrapper}>
      <p>
        <span className={styles.textareaTitle}>{label}</span>
        {isRequired && <span className={styles.required}>*</span>}
      </p>
      {isInvalid && <span className={styles.invalidText}>Can't be empty</span>}
      <textarea
        id={label}
        className={styles.textarea}
        data-invalid={isInvalid ? "invalid" : ""}
        type="text"
        rows="5"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Textarea;
