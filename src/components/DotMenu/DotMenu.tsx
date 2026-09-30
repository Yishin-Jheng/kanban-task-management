import { useRef, useState } from "react";
import { dotMenuIcon } from "@/assets/icon";
import { useClickOutside } from "@/hooks/useClickOutside";
import styles from "./DotMenu.module.scss";

const buttonTypeMap = {
  default: styles.btnDefault,
  warning: styles.btnWarning,
} as const;

export type ButtonSetting = {
  btnType: keyof typeof buttonTypeMap;
  btnText: string;
  onClick: () => void;
};

interface DotMenuProps {
  settings: ButtonSetting[];
}

function DotMenu(props: DotMenuProps) {
  const { settings } = props;
  const dotMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dotMenuRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={dotMenuRef}
      className={styles.dotMenu}
      onClick={() => setIsOpen((pre) => !pre)}
    >
      {dotMenuIcon}
      <ul className={styles.menuList} data-open={isOpen ? "open" : ""}>
        {settings.map((setting) => {
          const { btnType, btnText, onClick } = setting;
          return (
            <li
              key={`${btnType}-${btnText}`}
              className={buttonTypeMap[btnType]}
              onClick={onClick}
            >
              {btnText}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default DotMenu;
