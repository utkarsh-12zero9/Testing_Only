import { useState, useEffect } from "react";

export default function GetDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0, // Set default values to avoid SSR issues
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowDimensions;
}
