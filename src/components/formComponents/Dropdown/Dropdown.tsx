import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { downIcon, upIcon } from "@/assets/icon";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import styles from "./Dropdown.module.scss";

const optionFormatter = (string: string): string => {
  if (!string) return "";
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const handleOverViewport = function (
  dropdownRef: React.RefObject<HTMLElement>,
  setOverViewport: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const dropdown = dropdownRef.current;

  if (!dropdown) return;

  const isOverViewport =
    window.innerHeight - dropdown.getBoundingClientRect().bottom < 120;
  setOverViewport(isOverViewport);
};

type DropdownOption = {
  text: string;
  value: string | number;
};

interface DropdownProps {
  /** 標題 */
  label: string;
  /** 當前選項的值 */
  value?: string | number;
  /** 選項列表 */
  options: DropdownOption[];
  /** 是否載入中 */
  isLoading?: boolean;
  /** 狀態改變時呼叫的函式 */
  onChange: (value: string | number, option: DropdownOption) => void;
}

function Dropdown(props: DropdownProps) {
  const { label, value, options, isLoading = false, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [overViewport, setOverViewport] = useState(false);
  const isMobile2 = useMediaQuery({ query: "(max-width: 515px)" });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentOption = options.find((col) => col.value === value);

  const handleOpen = function () {
    if (isLoading) return;
    setIsOpen(!isOpen);
    handleOverViewport(dropdownRef, setOverViewport);
  };

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className={styles.dropdownContainer}>
      <span className={styles.dropdownTitle}>{label}</span>
      <div
        ref={dropdownRef}
        className={styles.dropdown}
        data-disabled={isLoading ? "disabled" : ""}
        onClick={handleOpen}
      >
        <div className={styles.currentSelect} data-open={isOpen ? "open" : ""}>
          <span
            className={styles.selectText}
            data-active={currentOption ? "active" : ""}
          >
            {currentOption
              ? optionFormatter(currentOption.text)
              : "Please select"}
          </span>
          {isLoading && <LoadingIcon />}
          {!isLoading && (
            <figure className={styles.selectIcon}>
              {isOpen ? upIcon : downIcon}
            </figure>
          )}
        </div>
        <ul
          className={styles.optionList}
          data-open={isOpen ? "open" : "close"}
          data-mobile={isMobile2 || overViewport ? "mobile" : ""}
          onClick={handleOpen}
        >
          {options.map((option) => {
            const { text, value } = option;
            return (
              <li
                key={value}
                className={styles.option}
                onClick={() => {
                  if (!isLoading) onChange(option.value, option);
                }}
              >
                {optionFormatter(text)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
