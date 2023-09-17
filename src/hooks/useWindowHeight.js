import { useState, useEffect } from "react";

function getWindowHeight() {
  const { innerHeight: height } = window;
  return height;
}

export function useWindowHeight() {
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
