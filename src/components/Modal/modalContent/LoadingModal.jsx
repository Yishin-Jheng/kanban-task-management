import { useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { TbLoader } from "react-icons/tb";
import { closeModal } from "@/store/slices/modalSlice";
import styles from "../Modal.module.scss";

function LoadingModal({ isLoading }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.modalTitle}>
        <span>
          {isLoading ? "Is Saving Your Change Now..." : "Saved Successfully !"}
        </span>
      </div>

      <p className={styles.modalContent}>
        {isLoading
          ? "Please do not close this page before save is done."
          : "Save is done. Click button to close modal window."}
      </p>

      <div>
        {/* XXX: 待抽元件 */}
        <div
          className="btn-medium"
          disabled={isLoading}
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          {isLoading ? (
            <IconContext.Provider value={{ size: "2rem" }}>
              {/* XXX: loading-icon常常重複利用，之後再看看怎麼抽 */}
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
