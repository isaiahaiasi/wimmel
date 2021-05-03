import React from "react";
import useMousePosition from "../hooks/useMousePosition";
import MouseDetectionContainer from "../styled-components/MouseDetectionContainer";
import MouseDetectionSight from "../styled-components/MouseDetectionSight";

function MouseDetector({ onClick, children }, ref) {
  // ? Using a synthetic event here might not be sufficiently performant
  const [mousePos, setMousePos] = useMousePosition();

  const handleMouseMove = setMousePos;

  function renderMousePos() {
    return (
      <div style={{ position: "absolute", color: "white" }}>
        mouse x: {mousePos?.x ?? "no mouse position!"}
        <br />
        mouse y: {mousePos?.y ?? "no mouse position!"}
      </div>
    );
  }

  return (
    <>
      {renderMousePos()}
      <MouseDetectionContainer
        ref={ref}
        onMouseMove={handleMouseMove}
        onClick={() => onClick(mousePos)}
      >
        <div className="mouse-detection-container-hud">{children}</div>

        <MouseDetectionSight
          pos={mousePos}
          // sadly, styled-components makes new instance
          // every time props passed change
          style={{ top: mousePos?.y, left: mousePos?.x }}
        />
      </MouseDetectionContainer>
    </>
  );
}

export default React.forwardRef(MouseDetector);
