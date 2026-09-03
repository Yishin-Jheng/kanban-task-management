import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useThunk } from "@/hooks/useThunk";
import { updateTasksStatus } from "@/store";
import styles from "./Dropdown.module.scss";

const downIcon = (
  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
  </svg>
);
const upIcon = (
  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
    <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
  </svg>
);
const formatter = (string) => string[0].toUpperCase() + string.slice(1);

const handleOverViewport = function (dropdownRef, setOverViewport) {
  const statusBottom = dropdownRef.current.getBoundingClientRect().bottom;

  if (window.innerHeight - statusBottom < 120) {
    setOverViewport(true);
  } else {
    setOverViewport(false);
  }
};

function Dropdown({ label = "", value = "", options = [], handleFormChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [overViewport, setOverViewport] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(value);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });
  const dropdownRef = useRef(null);

  const handleOpen = function () {
    setIsOpen(!isOpen);
    handleOverViewport(dropdownRef, setOverViewport);
  };

  handleFormChange(options.find((col) => col.statusName === currentStatus).id);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className={styles.dropdownContainer}>
      <span className={styles.dropdownTitle}>{label}</span>

      <div ref={dropdownRef} className={styles.dropdown} onClick={handleOpen}>
        <div className={styles.currentSelect} data-open={isOpen ? "open" : ""}>
          <span>{formatter(currentStatus)}</span>
          <figure className={styles.selectIcon}>
            {isOpen ? upIcon : downIcon}
          </figure>
        </div>

        <ul
          className={styles.optionList}
          data-open={isOpen ? "open" : "close"}
          data-mobile={isMobileTwo || overViewport ? "mobile" : ""}
          onClick={handleOpen}
        >
          {options.map((option) => {
            return (
              <li
                key={option.id}
                className={styles.option}
                onClick={() => {
                  setCurrentStatus(option.statusName);
                }}
              >
                {formatter(option.statusName)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function DropdownRequestVer({ label = "", value = "", options = [], taskId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [overViewport, setOverViewport] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(value);
  const [doUpdateTasks, isUpdatingTasks] = useThunk(updateTasksStatus);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });
  const dropdownRef = useRef(null);

  const handleOpen = function () {
    if (!isUpdatingTasks) {
      setIsOpen(!isOpen);
      handleOverViewport(dropdownRef, setOverViewport);
    }
  };

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className={styles.dropdownContainer}>
      <span className={styles.dropdownTitle}>{label}</span>

      <div ref={dropdownRef} className={styles.dropdown} onClick={handleOpen}>
        <div className={styles.currentSelect} data-open={isOpen ? "open" : ""}>
          <span>{formatter(currentStatus)}</span>

          {isUpdatingTasks ? (
            <LoadingIcon />
          ) : (
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
            return (
              <li
                key={option.id}
                className={styles.option}
                onClick={() => {
                  if (option.statusName !== currentStatus) {
                    setCurrentStatus(option.statusName);
                    doUpdateTasks({
                      columnId: option.id,
                      taskId: taskId,
                    });
                  }
                }}
              >
                {formatter(option.statusName)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { Dropdown, DropdownRequestVer };
