import { useState } from "react";

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
    <div className="input-box">
      <span className="modal__subtitle">{label}</span>

      {isInvalid ? (
        <span className="warning__text--description">Can't be empty</span>
      ) : null}

      <textarea
        id={label}
        className={isInvalid ? "warning" : ""}
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
