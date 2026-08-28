import { useState } from "react";
import styles from "./Textarea.module.scss";

function Textarea({
  checkInvalid,
  label,
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
    <div className={styles.textareaWrapper}>
      <span className={styles.textareaTitle}>{label}</span>
      {isInvalid && <span className={styles.invalidText}>Can't be empty</span>}
      <textarea
        id={label}
        className={styles.textarea}
        data-invalid={isInvalid ? "invalid" : ""}
        type="text"
        rows="5"
        maxLength="300"
        value={input}
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

export default Textarea;
