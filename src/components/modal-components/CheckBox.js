function CheckBox({ itemObj }) {
  return (
    <div className="subtask__box">
      <label className="subtask__checkbox" htmlFor={`subtask-${itemObj.id}`}>
        <input id={`subtask-${itemObj.id}`} type="checkbox" />
        <span className="checkmark"></span>
        <p>{itemObj.description}</p>
      </label>
    </div>
  );
}

export default CheckBox;
