import clsx from "clsx";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import styles from "./Button.module.scss";

const buttonTypeMap = new Map([
  ["default", styles.button],
  ["form", styles.formButton],
  ["formPrimary", styles.formPrimaryButton],
  ["formWarning", styles.formWarningButton],
]);

interface ButtonProps {
  /** 按鈕類型 */
  type?: "default" | "form" | "formPrimary" | "formWarning";
  /** 按鈕類型 */
  htmlType?: "button" | "submit";
  /** 額外樣式 */
  className?: string;
  /** 是否為行動裝置 */
  isMobile?: boolean;
  /** 是否禁用 */
  isDisabled?: boolean;
  /** 是否載入中 */
  isLoading?: boolean;
  /** 按鈕點擊事件 */
  onClick?: () => void;
}

function Button(props: React.PropsWithChildren<ButtonProps>) {
  const {
    type = "default",
    htmlType = "button",
    className = "",
    isMobile = false,
    isDisabled = false,
    isLoading = false,
    onClick = () => {},
  } = props;
  const isInactive = isDisabled || isLoading;

  return (
    <button
      type={htmlType}
      className={clsx(buttonTypeMap.get(type), className)}
      data-mobile={isMobile ? "mobile" : ""}
      data-disabled={isDisabled ? "disabled" : ""}
      disabled={isInactive}
      onClick={() => {
        if (!isInactive) {
          onClick();
        }
      }}
    >
      {!isLoading && props.children}
      {isLoading && <LoadingIcon color="currentColor" size="18px" />}
    </button>
  );
}

export default Button;
