import React from "react";
import useMousePosition from "../hooks/useMousePosition";
import MouseDetectionContainer from "../styled-components/MouseDetectionContainer";
import MouseDetectionSight from "../styled-components/MouseDetectionSight";

export default function MouseDetector({ onClick, children }) {
  // ? Using a synthetic event here might not be sufficiently performant
  const [mousePos, onMouseMove] = useMousePosition();

  return (
    <MouseDetectionContainer
      onMouseMove={onMouseMove}
      onClick={() => onClick(mousePos)}
    >
      <MouseDetectionSight
        pos={mousePos}
        // sadly, styled-components makes new instance
        // every time props passed change
        style={{ top: mousePos?.y, left: mousePos?.x }}
      />
      mouse x: {mousePos?.x ?? "no mouse position!"}
      <br />
      mouse y: {mousePos?.y ?? "no mouse position!"}
      {children}
    </MouseDetectionContainer>
  );
}
