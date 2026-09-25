import { RefObject, useEffect } from "react";

/**
 * useClickOutside
 * @param targetRef 目標元素
 * @param onClickOutside 點擊的 DOM 路徑中不包含目標元素時觸發的 callback
 */
export function useClickOutside(
  targetRef: RefObject<HTMLElement>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    const handleClickOutside = function (e: MouseEvent) {
      const target = targetRef.current;

      if (target && !e.composedPath().includes(target)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [targetRef, onClickOutside]);
}
