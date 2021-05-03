import { useState, useEffect, useRef } from "react";

export default function useRefSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const ref = useRef();

  function updateDimensions() {
    if (ref !== null) {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    }
  }

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    window.addEventListener("resize", updateDimensions);

    const refImg = ref.current.querySelector("img");
    refImg.addEventListener("load", updateDimensions);

    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      refImg.removeEventListener("load", updateDimensions);
    };
  }, []);

  return [{ width, height }, ref];
}
