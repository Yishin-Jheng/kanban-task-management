import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useThunk } from "../../hooks/useThunk";
import { setForm, updateTasksStatus } from "../../store";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";

function Dropdown({ selectObj }) {
  const dispatch = useDispatch();
  const formObj = useSelector((state) => state.form);
  const [isOpen, setIsOpen] = useState(false);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });

  const handleClick = function () {
    setIsOpen(!isOpen);
  };

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

  return (
    <div className="status">
      <span className="modal__subtitle">{selectObj.title}</span>

      <div className="status__container" onClick={handleClick}>
        <div
          className={`status__selected ${
            isOpen ? "status__selected--open" : ""
          }`}
        >
          <span>
            {formObj.status
              ? formObj.status[0].toUpperCase() + formObj.status.slice(1)
              : "Loading..."}
          </span>
          <figure className="status__icon">{isOpen ? upIcon : downIcon}</figure>
        </div>

        <ul
          className={`status__options ${
            isOpen ? "status__options--open" : ""
          } ${isMobileTwo ? "status__options--mobile" : ""}`}
          onClick={handleClick}
        >
          {selectObj.options.map((option) => {
            return (
              <li
                key={option.id}
                onClick={() => {
                  dispatch(setForm({ status: option.statusName }));
                }}
              >
                {option.statusName[0].toUpperCase() +
                  option.statusName.slice(1)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function DropdownRequestVer({ selectObj }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(selectObj.selected);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });
  const [doUpdateTasks, isLoadingTasks, loadingTasksError] =
    useThunk(updateTasksStatus);

  const handleClick = function () {
    if (!isLoadingTasks) setIsOpen(!isOpen);
  };

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

  return (
    <div className="status">
      <span className="modal__subtitle">{selectObj.title}</span>

      <div className="status__container" onClick={handleClick}>
        <div
          className={`status__selected ${
            isOpen ? "status__selected--open" : ""
          }`}
        >
          <span>{currentStatus[0].toUpperCase() + currentStatus.slice(1)}</span>

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
          onClick={handleClick}
        >
          {selectObj.options.map((option) => {
            return (
              <li
                key={option.id}
                onClick={() => {
                  setCurrentStatus(option.statusName);
                  doUpdateTasks({
                    columnId: option.id,
                    taskId: selectObj.taskId,
                  });
                }}
              >
                {option.statusName[0].toUpperCase() +
                  option.statusName.slice(1)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { Dropdown, DropdownRequestVer };
