import { useState } from "react";

function DeletableInput({ inputArr, subTitle, btnText }) {
  const [newInput, setNewInput] = useState(0);
  const newInputJSX = [];
  for (let i = 1; i <= newInput; i++) {
    newInputJSX.push(<InputItem key={i} newOrNot={true} />);
  }
  const handleAddInput = () => {
    setNewInput(newInput + 1);
  };
  const handleRemoveInput = () => {
    setNewInput(newInput - 1);
  };

  function InputItem({ itemObj, newOrNot }) {
    if (newOrNot) {
      return (
        <div className="input-box__container">
          <input name="new-input" className="newInput" type="text" />
          <svg
            width="16"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleRemoveInput}
          >
            <g fillRule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
      );
    }

    return (
      <div className="input-box__container">
        <input
          id={`new-task-subtask-${itemObj.id}`}
          type="text"
          value={itemObj.value}
          placeholder={itemObj.placeholder}
        />
        <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
          <g fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="input-box">
      <span className="modal__subtitle">{subTitle}</span>

      {inputArr.map((obj) => {
        return <InputItem key={obj.id} itemObj={obj} />;
      })}

      {newInputJSX}

      <button className="btn-medium" onClick={handleAddInput}>
        {btnText}
      </button>
    </div>
  );
}

function InputItem({ itemObj, newOrNot }) {
  if (newOrNot) {
    return (
      <div className="input-box__container">
        <input className="newInput" type="text" />
        <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
          <g fillRule="evenodd">
            <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
            <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className="input-box__container">
      <input
        id={`new-task-subtask-${itemObj.id}`}
        type="text"
        value={itemObj.value}
        placeholder={itemObj.placeholder}
      />
      <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

export default DeletableInput;
