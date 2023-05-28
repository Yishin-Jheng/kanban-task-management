import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function Dropdown({ selectObj }) {
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
          <span>{selectObj.selected}</span>
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
              <li key={option} data-value={option}>
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
