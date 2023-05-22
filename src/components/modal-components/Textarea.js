function Textarea({ inputObj }) {
  return (
    <div className="input-box">
      <span className="modal__subtitle">{inputObj.title}</span>
      <textarea
        id={inputObj.id}
        type="text"
        rows="5"
        value={inputObj.value}
        placeholder={inputObj.placeholder}
      />
    </div>
  );
}

export default Textarea;
