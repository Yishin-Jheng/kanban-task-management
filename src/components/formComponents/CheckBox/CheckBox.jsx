import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import styles from "./CheckBox.module.scss";

/**
 * CheckBox
 * @param {string | number} props.id 元件ID
 * @param {string} props.description 內容描述
 * @param {boolean} props.isChecked 是否已勾選
 * @param {boolean} props.isLoading 是否載入中
 * @param {function} props.onChange 狀態改變時呼叫的函式
 */
function CheckBox(props) {
  const { id, description, isChecked, isLoading, onChange } = props;
  const checkboxId = `checkbox-${id}`;

  return (
    <div className={styles.checkboxWrapper}>
      <label
        className={styles.checkboxLabel}
        htmlFor={isLoading ? "" : checkboxId}
      >
        {isLoading && <LoadingIcon />}
        {!isLoading && (
          <>
            <input
              id={checkboxId}
              type="checkbox"
              checked={isChecked}
              onChange={onChange}
            />
            <span className={styles.checkmark}></span>
          </>
        )}
        <p>{description}</p>
      </label>
    </div>
  );
}

export default CheckBox;
