import { useState } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

function Input({
  checkInvalid,
  label,
  type,
  value,
  placeholder,
  handleFormChange,
}) {
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
