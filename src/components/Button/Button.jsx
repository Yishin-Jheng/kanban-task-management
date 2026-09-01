import clsx from "clsx";
import styles from "./Button.module.scss";

const buttonTypeMap = new Map([
  ["default", styles.button],
  ["form", styles.formButton],
  ["formPrimary", styles.formPrimaryButton],
  ["formWarning", styles.formWarningButton],
]);

/**
 * Button
 * @param {'default' | 'form' | 'formPrimary' | 'formWarning'} props.type 按鈕類型
 * @param {string} props.text 按鈕文字
 * @param {string} props.className 額外樣式
 * @param {boolean} props.isMobile 是否為行動裝置
 * @param {boolean} props.isDisabled 是否禁用
 * @param {function} props.onClick 按鈕點擊事件
 */
function Button(props) {
  const {
    type = "default",
    text = "",
    className,
    isMobile = false,
    isDisabled = false,
    onClick,
  } = props;
  return (
    <div
      className={clsx(buttonTypeMap.get(type), className)}
      data-mobile={isMobile ? "mobile" : ""}
      data-disabled={isDisabled ? "disabled" : ""}
      onClick={() => {
        if (!isDisabled) {
          onClick();
        }
      }}
    >
      {props.children || text}
    </div>
  );
}

export default Button;
