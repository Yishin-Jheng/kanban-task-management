import clsx from "clsx";
import { crossIcon } from "@/assets/icon";
import Button from "@/components/Button/Button";
import styles from "./DeletableInput.module.scss";

/**
 * DeletableInput
 * @param {string} props.label 標題
 * @param {string} props.btnLabel 按鈕文字
 * @param {string} props.valueKey 顯示值的key
 * @param {{localId: number, [valueKey]: string}[]} props.values 顯示值
 * @param {string[]} props.placeholders 提示文字
 * @param {number} props.maxLength 最大字數限制
 * @param {boolean} props.isInvalid 是否必填檢查未通過
 * @param {function} props.onChange 狀態改變時呼叫的函式
 */
function DeletableInput({
  label = "",
  btnLabel = "+ Add New Item",
  valueKey,
  values = [],
  placeholders = ["e.g. Make coffee", "e.g. Drink coffee & smile"],
  maxLength = 120,
  isInvalid = false,
  onChange = () => {},
}) {
  const handleAddInput = () => {
    const maxIdNum = Math.max(...values.map((item) => item.localId));
    onChange([
      ...values,
      {
        localId: maxIdNum > 0 ? maxIdNum + 1 : 1,
        [valueKey]: "",
      },
    ]);
  };

  const handleInputChange = (id, value) => {
    onChange(
      values.map((item) => {
        if (item.localId === id) {
          return { ...item, [valueKey]: value };
        }
        return item;
      }),
    );
  };

  const handleRemoveInput = (id) => {
    onChange(values.filter((item) => item.localId !== id));
  };

  return (
    <div className={styles.inputBox}>
      <span className={styles.inputTitle}>{label}</span>
      <div className={styles.inputScrollbox}>
        {values.map((item, index) => {
          return (
            <div key={item.localId} className={styles.inputGroup}>
              <InputBlock
                localId={item.localId}
                value={item[valueKey]}
                placeholder={placeholders[index] ?? ""}
                maxLength={maxLength}
                isInvalid={isInvalid}
                onChange={handleInputChange}
              />
              <div onClick={() => handleRemoveInput(item.localId)}>
                {crossIcon}
              </div>
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
  maxLength = 120,
  isInvalid = false,
  onChange = () => {},
}) {
  const isShowInvalidMsg = isInvalid && !value;
  return (
    <>
      {isShowInvalidMsg ? (
        <span className={styles.invalidText}>Can't be empty</span>
      ) : null}
      <input
        id={localId}
        className={clsx(
          styles.input,
          isShowInvalidMsg ? styles.invalidWrapper : "",
        )}
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}

export { DeletableInput };
