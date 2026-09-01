import { useEffect } from "react";

/**
 * useClickOutside
 * @param {React.Ref} targetRef 參照物元件ref
 * @param {function} onClickOutside 當點擊對象不為參照物元件時呼叫的函式
 */
export function useClickOutside(targetRef, onClickOutside) {
  useEffect(() => {
    const handleClickOutside = function (e) {
      if (targetRef.current && !targetRef.current.contains(e.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
}
