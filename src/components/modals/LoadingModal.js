import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";

function LoadingModal({ isLoading }) {
  return (
    <form className="modal">
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
        <button className="btn-medium" disabled={isLoading}>
          {isLoading ? (
            <IconContext.Provider value={{ size: "2rem" }}>
              <TbLoader className="loading-icon" />
            </IconContext.Provider>
          ) : (
            "Close"
          )}
        </button>
      </div>
    </form>
  );
}

export default LoadingModal;
