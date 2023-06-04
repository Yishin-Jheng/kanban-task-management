import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useThunk } from "../../hooks/useThunk";
import { updateTasks } from "../../store/thunks/updateTasks";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";

// TODO: How to make dropdown status change correctly in both TaskDetailModal and NewOrEditTaskModal?
// 原先的計畫中，我希望在 TaskDetailModal 中只要狀態有任何更動就會立刻送出 request 給後端，但是在 NewOrEditTaskModal 中則是會在按下提交按鈕後才送 request。不過目前的 Dropdown 是沒有辦法同時滿足這兩個 modal 的需求。

function Dropdown({ selectObj }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(selectObj.selected);
  const isMobileTwo = useMediaQuery({ query: `(max-width: 515px)` });
  // TODO: updating task status, and how to re-render column components?
  const [doUpdateTasks, isLoadingTasks, loadingTasksError] =
    useThunk(updateTasks);

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
          <span>{currentStatus[0].toUpperCase() + currentStatus.slice(1)}</span>
          <figure className="status__icon">{isOpen ? upIcon : downIcon}</figure>

          {/* <IconContext.Provider value={{ size: "16px", color: "#635fc7" }}>
            <TbLoader className="loading-icon" />
          </IconContext.Provider> */}
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
                key={option}
                data-value={option}
                onClick={() => {
                  setCurrentStatus(option);
                }}
              >
                {option[0].toUpperCase() + option.slice(1)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
