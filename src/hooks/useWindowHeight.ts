import { useEffect, useState } from "react";

function getWindowHeight(): number {
  const { innerHeight: height } = window;
  return height;
}

export function useWindowHeight(): number {
  const [height, setHeight] = useState(getWindowHeight());

  useEffect(() => {
    const handleResize = () => {
      setHeight(getWindowHeight());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return height;
}
