import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (input) {
      handleFormChange(input);
    }
  }, [input]);

  return (
    <div className="input-box">
      <span className="modal__subtitle">{label}</span>

      {isInvalid ? (
        <span className="warning__text--title">Can't be empty</span>
      ) : null}

      <input
        id={label}
        className={isInvalid ? "warning" : ""}
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
