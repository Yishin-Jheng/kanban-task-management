import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";
import { updateTasksStatus } from "../../store";
import { useThunk } from "../../hooks/useThunk";

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

function Dropdown({ label, value, options, handleFormChange }) {
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

  useEffect(() => {
    const handleClickOutside = function (e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="status">
      <span className="modal__subtitle">{label}</span>

      <div ref={dropdownRef} className="status__container" onClick={handleOpen}>
        <div
          className={`status__selected ${
            isOpen ? "status__selected--open" : ""
          }`}
        >
          <span>{formatter(currentStatus)}</span>
          <figure className="status__icon">{isOpen ? upIcon : downIcon}</figure>
        </div>

        <ul
          className={`status__options ${
            isOpen ? "status__options--open" : "status__options--close"
          } ${isMobileTwo || overViewport ? "status__options--mobile" : ""}`}
          onClick={handleOpen}
        >
          {options.map((option) => {
            return (
              <li
                key={option.id}
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

function DropdownRequestVer({ label, value, options, taskId }) {
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

  useEffect(() => {
    const handleClickOutside = function (e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="status">
      <span className="modal__subtitle">{label}</span>

      <div ref={dropdownRef} className="status__container" onClick={handleOpen}>
        <div
          className={`status__selected ${
            isOpen ? "status__selected--open" : ""
          }`}
        >
          <span>{formatter(currentStatus)}</span>

          {isUpdatingTasks ? (
            <IconContext.Provider value={{ size: "16px", color: "#635fc7" }}>
              <TbLoader className="loading-icon" />
            </IconContext.Provider>
          ) : (
            <figure className="status__icon">
              {isOpen ? upIcon : downIcon}
            </figure>
          )}
        </div>

        <ul
          className={`status__options ${
            isOpen ? "status__options--open" : "status__options--close"
          } ${isMobileTwo || overViewport ? "status__options--mobile" : ""}`}
          onClick={handleOpen}
        >
          {options.map((option) => {
            return (
              <li
                key={option.id}
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
