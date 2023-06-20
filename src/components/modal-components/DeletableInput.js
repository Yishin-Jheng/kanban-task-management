import { useEffect, useState } from "react";

function DeletableInput({
  checkInvalid,
  label,
  btnLabel,
  valueKey,
  values,
  handleFormChange,
}) {
  const [items, setItems] = useState(values);

  const handleAddInput = () => {
    const maxNum = Math.max(...items.map((item) => item.id));
    setItems([
      ...items,
      {
        id: maxNum >= 0 ? maxNum + 1 : 1,
        [valueKey]: "",
      },
    ]);
  };
  const handleRemoveInput = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const handleInputChange = (id, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [valueKey]: value };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    const validItems =
      valueKey === "description"
        ? items.filter((item) => item.description)
        : items.filter((item) => item.statusName);
    handleFormChange(validItems);
  }, [items]);

  const listItems = items.map((obj) => {
    return (
      <div key={obj.id} className="input-box__container">
        {valueKey === "description" ? (
          <InputBlock
            checkInvalid={checkInvalid}
            id={obj.id}
            value={obj.description ? obj.description : ""}
            placeholder={obj.placeholder ? obj.placeholder : ""}
            handleInputChange={handleInputChange}
          />
        ) : (
          <InputBlock
            checkInvalid={checkInvalid}
            id={obj.id}
            value={obj.statusName ? obj.statusName : ""}
            placeholder={obj.placeholder ? obj.placeholder : ""}
            handleInputChange={handleInputChange}
          />
        )}

        <svg
          width="16"
          height="15"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleRemoveInput(obj.id)}
        >
          <g fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </div>
    );
  });

  return (
    <div className="input-box">
      <span className="modal__subtitle">{label}</span>

      <div className="modal__scrollbox">{listItems}</div>

      <div className="btn-medium" onClick={handleAddInput}>
        {btnLabel}
      </div>
    </div>
  );
}

function InputBlock({
  checkInvalid,
  id,
  value,
  placeholder,
  handleInputChange,
}) {
  const [input, setInput] = useState(value);
  const [clicked, setClicked] = useState(false);
  const isInvalid = (clicked && !input) || (checkInvalid && !input);

  return (
    <>
      {isInvalid ? (
        <span className="warning__text--subtask">Can't be empty</span>
      ) : null}

      <input
        id={id}
        className={isInvalid ? "warning" : ""}
        type="text"
        value={input}
        placeholder={placeholder}
        onBlur={() => {
          setClicked(true);
        }}
        onChange={(e) => {
          setInput(e.target.value);
          handleInputChange(id, e.target.value);
        }}
      />
    </>
  );
}

export { DeletableInput };
