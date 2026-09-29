import clsx from "clsx";
import { crossIcon } from "@/assets/icon";
import Button from "@/components/Button/Button";
import styles from "./DeletableInput.module.scss";

interface DeletableInputProps<K extends string> {
  /** 標題 */
  label: string;
  /** 按鈕文字 */
  btnLabel?: string;
  /** 顯示值的key */
  valueKey: K;
  /** 顯示值 */
  values: Record<K, string>[];
  /** 點擊新增按鈕後新增的預設值 */
  emptyValue: Record<K, string>;
  /** 提示文字 */
  placeholders?: string[];
  /** 最大字數限制 */
  maxLength?: number;
  /** 是否必填檢查未通過 */
  isInvalid?: boolean;
  /** 狀態改變時呼叫的callback */
  onChange: (values: Record<K, string>[]) => void;
}

function DeletableInput<K extends string>(props: DeletableInputProps<K>) {
  const {
    label,
    btnLabel = "+ Add New Item",
    valueKey,
    values,
    emptyValue,
    placeholders = ["e.g. Make coffee", "e.g. Drink coffee & smile"],
    maxLength = 120,
    isInvalid = false,
    onChange,
  } = props;

  const handleAddInput = () => {
    onChange([...values, emptyValue]);
  };

  const handleInputChange = (index: number, value: string) => {
    onChange(
      values.map((item, i) => {
        if (i === index) {
          return { ...item, [valueKey]: value };
        }
        return item;
      }),
    );
  };

  const handleRemoveInput = (index: number) => {
    onChange(values.filter((_item, i) => i !== index));
  };

  return (
    <div className={styles.inputBox}>
      <span className={styles.inputTitle}>{label}</span>
      <div className={styles.inputScrollbox}>
        {values.map((item, index) => {
          return (
            <div key={index} className={styles.inputGroup}>
              <InputBlock
                index={index}
                value={item[valueKey]}
                placeholder={placeholders[index] ?? ""}
                maxLength={maxLength}
                isInvalid={isInvalid}
                onChange={handleInputChange}
              />
              <div onClick={() => handleRemoveInput(index)}>{crossIcon}</div>
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

interface InputBlockProps {
  /** 索引值 */
  index: number;
  /** 顯示值 */
  value: string;
  /** 提示文字 */
  placeholder?: string;
  /** 最大字數限制 */
  maxLength?: number;
  /** 是否必填檢查未通過 */
  isInvalid?: boolean;
  /** 狀態改變時呼叫的callback */
  onChange: (index: number, value: string) => void;
}

function InputBlock(props: InputBlockProps) {
  const {
    index,
    value,
    placeholder = "",
    maxLength = 120,
    isInvalid = false,
    onChange,
  } = props;
  const isShowInvalidMsg = isInvalid && !value;

  return (
    <>
      {isShowInvalidMsg ? (
        <span className={styles.invalidText}>Can't be empty</span>
      ) : null}
      <input
        className={clsx(
          styles.input,
          isShowInvalidMsg ? styles.invalidWrapper : "",
        )}
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(index, e.target.value)}
      />
    </>
  );
}

export { DeletableInput };
