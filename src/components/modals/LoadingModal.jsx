import { useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";
import { closeModal } from "../../store/slices/modalSlice";

function LoadingModal({ isLoading }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="modal__title">
        <span>
          {isLoading ? "Is Saving Your Change Now..." : "Saved Successfully !"}
        </span>
      </div>

      <p className="modal__content">
        {isLoading
          ? "Please do not close this page before save is done."
          : "Save is done. Click button to close modal window."}
      </p>

      <div className="modal__btns">
        <div
          className="btn-medium"
          disabled={isLoading}
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          {isLoading ? (
            <IconContext.Provider value={{ size: "2rem" }}>
              <TbLoader className="loading-icon" />
            </IconContext.Provider>
          ) : (
            "Close"
          )}
        </div>
      </div>
    </>
  );
}

export default LoadingModal;
