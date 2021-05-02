import { useState, useEffect } from "react";

// TODO: I feel like I shouldn't need 3 state hooks...

export default function useMousePosition() {
  const [scrollPos, setScrollPos] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseOffsetPos, setMouseOffsetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleMouseUpdate();
  }, [mousePos, scrollPos]);

  function handleScroll() {
    setScrollPos({ x: window.scrollX, y: window.scrollY });
    console.log(mousePos);
  }

  function handleMouseMove(event) {
    setMousePos({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  }

  function handleMouseUpdate() {
    setMouseOffsetPos(() => {
      return {
        x: mousePos.x + scrollPos.x,
        y: mousePos.y + scrollPos.y,
      };
    });
  }

  return [mouseOffsetPos, handleMouseMove];
}
