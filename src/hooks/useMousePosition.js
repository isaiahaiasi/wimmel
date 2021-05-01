import { useState } from "react";

export default function useMousePosition() {
  const [mousePos, setMousePos] = useState();

  function handleMouseMove(event) {
    setMousePos({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  }

  return [mousePos, handleMouseMove];
}
