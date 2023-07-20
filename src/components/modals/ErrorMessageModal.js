import { useDispatch } from "react-redux";
import { closeModal } from "../../store/slices/modalSlice";

function ErrorMessageModal({ errorMsg }) {
  const dispatch = useDispatch();

  return (
    <form className="modal">
      <div className="modal__title">
        <span>Something is wrong...</span>
      </div>

      <p className="modal__content">{errorMsg}</p>

      <div className="modal__btns">
        <div
          className="btn-medium"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          Close
        </div>
      </div>
    </form>
  );
}

export default ErrorMessageModal;
