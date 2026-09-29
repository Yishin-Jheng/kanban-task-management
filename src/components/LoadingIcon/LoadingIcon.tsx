import { TbLoader } from "react-icons/tb";
import styles from "./LoadingIcon.module.scss";

interface LoadingIconProps {
  /** 尺寸 */
  size?: string;
  /** 顏色 */
  color?: string;
}

function LoadingIcon(props: LoadingIconProps) {
  const { size = "16px", color = "#635fc7" } = props;

  return <TbLoader className={styles.loadingIcon} size={size} color={color} />;
}

export default LoadingIcon;
