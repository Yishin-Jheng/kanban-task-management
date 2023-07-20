import { useEffect, useState } from "react";
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

function Dropdown({ label, value, options, handleFormChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(value);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });

  const handleOpen = function () {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const currentId = options.find((col) => col.statusName === value).id;
    handleFormChange(currentId);
  }, []);

  return (
    <div className="status">
      <span className="modal__subtitle">{label}</span>

      <div className="status__container" onClick={handleOpen}>
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
            isOpen ? "status__options--open" : ""
          } ${isMobileTwo ? "status__options--mobile" : ""}`}
          onClick={handleOpen}
        >
          {options.map((option) => {
            return (
              <li
                key={option.id}
                onClick={() => {
                  setCurrentStatus(option.statusName);
                  handleFormChange(option.id);
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
  const [currentStatus, setCurrentStatus] = useState(value);
  const [doUpdateTasks, isLoadingTasks, loadingTasksError] =
    useThunk(updateTasksStatus);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });

  const handleOpen = function () {
    if (!isLoadingTasks) setIsOpen(!isOpen);
  };

  return (
    <div className="status">
      <span className="modal__subtitle">{label}</span>

      <div className="status__container" onClick={handleOpen}>
        <div
          className={`status__selected ${
            isOpen ? "status__selected--open" : ""
          }`}
        >
          <span>{formatter(currentStatus)}</span>

          {isLoadingTasks ? (
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
            isOpen ? "status__options--open" : ""
          } ${isMobileTwo ? "status__options--mobile" : ""}`}
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
