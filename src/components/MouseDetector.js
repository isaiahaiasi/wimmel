import React from "react";
import MouseDetectionContainer from "../styled-components/MouseDetectionContainer";
import MouseDetectionSight from "../styled-components/MouseDetectionSight";

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
