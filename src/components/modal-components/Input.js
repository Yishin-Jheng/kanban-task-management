function Input({ inputObj }) {
  return (
    <div className="input-box">
      <span className="modal__subtitle">{inputObj.title}</span>
      <input
        id={inputObj.id}
        type="text"
        value={inputObj.value}
        placeholder={inputObj.placeholder}
      />
    </div>
  );
}

export default Input;
