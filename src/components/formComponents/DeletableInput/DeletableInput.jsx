import { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@/components/Button/Button";
import styles from "./DeletableInput.module.scss";

function DeletableInput({
  checkInvalid,
  label,
  btnLabel,
  valueKey,
  values,
  handleFormChange,
  handleFormDelete,
}) {
  const [items, setItems] = useState(values);
  const [deletedItems, setDeletedItems] = useState([]);
  const validItems =
    valueKey === "description"
      ? items.filter((item) => item.description)
      : items.filter((item) => item.statusName);

  const handleAddInput = () => {
    const maxIdNum = Math.max(...items.map((item) => item.id));
    setItems([
      ...items,
      {
        id: maxIdNum >= 0 ? maxIdNum + 1 : 1,
        [valueKey]: "",
      },
    ]);
  };

  const handleRemoveInput = (removedItem) => {
    if (removedItem.taskId) {
      setDeletedItems([
        ...deletedItems,
        {
          id: removedItem.id,
          checkOrNot: removedItem.checkOrNot,
          isDeleted: true,
        },
      ]);
    }

    if (removedItem.boardId) {
      setDeletedItems([
        ...deletedItems,
        {
          id: removedItem.id,
          isDeleted: true,
        },
      ]);
    }

    setItems(items.filter((item) => item.id !== removedItem.id));
  };

  const handleInputChange = (id, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          if (item.taskId || item.boardId) {
            return { ...item, isUpdated: true, [valueKey]: value };
          } else {
            return { ...item, [valueKey]: value };
          }
        } else {
          return item;
        }
      }),
    );
  };

  handleFormChange(validItems);

  useEffect(() => {
    handleFormDelete(deletedItems);
  }, [deletedItems, handleFormDelete]);

  return (
    <div className={styles.inputBox}>
      <span className={styles.inputTitle}>{label}</span>
      <div className={styles.inputScrollbox}>
        {items.map((obj) => {
          return (
            <div key={obj.id} className={styles.inputGroup}>
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
                onClick={() => handleRemoveInput(obj)}
              >
                <g fillRule="evenodd">
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </div>
          );
        })}
      </div>
      <Button type="form" onClick={handleAddInput}>
        {btnLabel}
      </Button>
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
        <span className={styles.invalidText}>Can't be empty</span>
      ) : null}
      <input
        id={id}
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
          handleInputChange(id, e.target.value);
        }}
      />
    </>
  );
}

export { DeletableInput };
