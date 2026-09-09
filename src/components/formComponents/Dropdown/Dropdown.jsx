import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { downIcon, upIcon } from "@/assets/icon";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import styles from "./Dropdown.module.scss";

const optionFormatter = (string) => {
  if (!string) return "";
  return string[0].toUpperCase() + string.slice(1);
};

const handleOverViewport = function (dropdownRef, setOverViewport) {
  const statusBottom = dropdownRef.current.getBoundingClientRect().bottom;

  if (window.innerHeight - statusBottom < 120) {
    setOverViewport(true);
  } else {
    setOverViewport(false);
  }
};

/**
 * Dropdown
 * @param {string} props.label 標題
 * @param {string} props.value 目前選擇的選項值
 * @param {{text: string, value: string | number}[]} props.options 選項列表
 * @param {boolean} props.isLoading 是否載入中
 * @param {function} props.onChange 狀態改變時呼叫的函式
 */
function Dropdown(props) {
  const {
    label = "",
    value = null,
    options = [],
    isLoading = false,
    onChange = () => {},
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [overViewport, setOverViewport] = useState(false);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });
  const dropdownRef = useRef(null);
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
          <span>{optionFormatter(currentOption?.text)}</span>
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
          data-mobile={isMobileTwo || overViewport ? "mobile" : ""}
          onClick={handleOpen}
        >
          {options.map((option) => {
            const { text, value } = option;
            return (
              <li
                key={value}
                className={styles.option}
                onClick={() => {
                  if (!isLoading) onChange(option);
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
