import { useState } from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

/**
 * Input
 * @param {string} props.label 標題
 * @param {string} props.type 類型
 * @param {string} props.value 初始值
 * @param {string} props.placeholder 提示文字
 * @param {boolean} props.checkInvalid 是否要進行必填檢查
 * @param {function} props.handleFormChange 狀態改變時呼叫的函式
 */
function Input(props) {
  const {
    label = "",
    type = "",
    value = "",
    placeholder = "",
    checkInvalid = false,
    handleFormChange = () => {},
  } = props;
  const [input, setInput] = useState(value);
  const [clicked, setClicked] = useState(false);
  const isInvalid = (clicked && !input) || (checkInvalid && !input);

  if (input) {
    handleFormChange(input);
  }

  return (
    <div className={styles.inputWrapper}>
      <span className={styles.inputTitle}>{label}</span>
      {isInvalid ? (
        <span className={styles.invalidText}>Can't be empty</span>
      ) : null}
      <input
        id={label}
        className={clsx(styles.input, isInvalid ? styles.invalidWrapper : "")}
        type={type}
        value={input}
        maxLength="120"
        placeholder={placeholder}
        onBlur={() => {
          setClicked(true);
        }}
        onChange={(e) => {
          setInput(e.target.value);
          handleFormChange(e.target.value);
        }}
      />
    </div>
  );
}

export default Input;
