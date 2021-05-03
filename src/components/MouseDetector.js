import React from "react";
import MouseDetectionContainer from "../styled-components/MouseDetectionContainer";

function MouseDetector({ mousePos, setMousePos, onClick, children }, ref) {
  // ? Using a synthetic event here might not be sufficiently performant

  return (
    <>
      <MouseDetectionContainer
        ref={ref}
        onMouseMove={setMousePos}
        onClick={() => onClick(mousePos)}
      >
        <div className="mouse-detection-container-hud">{children}</div>
      </MouseDetectionContainer>
    </>
  );
}

export default React.forwardRef(MouseDetector);
