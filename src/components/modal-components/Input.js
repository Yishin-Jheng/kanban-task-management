import { useSelector, useDispatch } from "react-redux";
import { setForm } from "../../store";

function Input({ inputObj }) {
  const dispatch = useDispatch();
  const formObj = useSelector((state) => state.form);

  const handleChange = (e) => {
    dispatch(setForm({ title: e.target.value }));
  };

  return (
    <div className="input-box">
      <span className="modal__subtitle">{inputObj.title}</span>
      <input
        id={inputObj.id}
        type="text"
        value={formObj.title}
        placeholder={inputObj.placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
