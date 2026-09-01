import { TbLoader } from "react-icons/tb";
import styles from "./LoadingIcon.module.scss";

/**
 * LoadingIcon
 * @param {string} props.size 尺寸
 * @param {string} props.color 顏色
 */
function LoadingIcon(props) {
  const { size = "16px", color = "#635fc7" } = props;

  return <TbLoader className={styles.loadingIcon} size={size} color={color} />;
}

export default LoadingIcon;
