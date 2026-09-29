import { useId } from "react";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import styles from "./CheckBox.module.scss";

interface CheckBoxProps {
  /** 內容描述 */
  description: string;
  /** 是否已勾選 */
  isChecked: boolean;
  /** 是否載入中 */
  isLoading?: boolean;
  /** 狀態改變時呼叫的callback */
  onChange: () => void;
}

function CheckBox(props: CheckBoxProps) {
  const { description, isChecked, isLoading = false, onChange } = props;
  const checkboxId = useId();

  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel} htmlFor={checkboxId}>
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
