import { useState } from "react";
import clsx from "clsx";
import { crossIcon } from "@/assets/icon";
import Button from "@/components/Button/Button";
import styles from "./DeletableInput.module.scss";

function DeletableInput({
  label = "",
  btnLabel = "+ Add New Item",
  valueKey,
  values,
  checkInvalid = false,
  onChange = () => {},
}) {
  // FIXME: 本地資料要不要留等之後zustand進來再評估看看
  const [items, setItems] = useState(values);
  const handleAddInput = () => {
    const maxIdNum = Math.max(...items.map((item) => item.localId));
    const updatedValues = [
      ...items,
      {
        localId: maxIdNum >= 0 ? maxIdNum + 1 : 1,
        [valueKey]: "",
      },
    ];
    setItems(updatedValues);
    onChange(updatedValues);
  };

  const handleInputChange = (id, value) => {
    const updatedValues = items.map((item) => {
      if (item.localId === id) {
        return { ...item, [valueKey]: value };
      }

      return item;
    });
    setItems(updatedValues);
    onChange(updatedValues);
  };

  const handleRemoveInput = (removedItem) => {
    const updatedValues = items.filter(
      (item) => item.localId !== removedItem.localId,
    );
    setItems(updatedValues);
    onChange(updatedValues);
  };

  return (
    <div className={styles.inputBox}>
      <span className={styles.inputTitle}>{label}</span>
      <div className={styles.inputScrollbox}>
        {items.map((obj) => {
          return (
            <div key={obj.localId} className={styles.inputGroup}>
              {valueKey === "description" ? (
                <InputBlock
                  localId={obj.localId}
                  value={obj.description}
                  placeholder={obj.placeholder}
                  checkInvalid={checkInvalid}
                  onChange={handleInputChange}
                />
              ) : (
                <InputBlock
                  localId={obj.localId}
                  value={obj.statusName}
                  placeholder={obj.placeholder}
                  checkInvalid={checkInvalid}
                  onChange={handleInputChange}
                />
              )}
              <div onClick={() => handleRemoveInput(obj)}>{crossIcon}</div>
            </div>
          );
        })}
        <div className={styles.scrollerAnchor}></div>
      </div>
      <Button type="form" onClick={handleAddInput}>
        {btnLabel}
      </Button>
    </div>
  );
}

function InputBlock({
  localId,
  value = "",
  placeholder = "",
  checkInvalid,
  onChange = () => {},
}) {
  const [input, setInput] = useState(value);
  const [clicked, setClicked] = useState(false);
  const isInvalid = (clicked && !input) || (checkInvalid && !input);

  return (
    <>
      <input
        id={localId}
        className={clsx(styles.input, isInvalid ? styles.invalidWrapper : "")}
        type="text"
        value={input}
        maxLength="120"
        placeholder={placeholder}
        onBlur={() => {
          setClicked(true);
        }}
        onChange={(e) => {
          setInput(e.target.value);
          onChange(localId, e.target.value);
        }}
      />
      {isInvalid ? (
        <span className={styles.invalidText}>Can't be empty</span>
      ) : null}
    </>
  );
}

export { DeletableInput };
