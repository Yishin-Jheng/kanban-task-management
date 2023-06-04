import { useSelector, useDispatch } from "react-redux";
import { setForm } from "../../store";

function Textarea({ inputObj }) {
  const dispatch = useDispatch();
  const formObj = useSelector((state) => state.form);

  const handleChange = (e) => {
    dispatch(setForm({ description: e.target.value }));
  };

  return (
    <div className="input-box">
      <span className="modal__subtitle">{inputObj.title}</span>
      <textarea
        id={inputObj.id}
        type="text"
        rows="5"
        value={formObj.description}
        placeholder={inputObj.placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default Textarea;
