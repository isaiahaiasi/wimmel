import React from "react";
import * as S from "../styled-components/main-game";

function MouseDetector({ mousePos, setMousePos, onClick, children }, ref) {
  // ? Using a synthetic event here might not be sufficiently performant

  return (
    <>
      <S.ImageContainer
        ref={ref}
        onMouseMove={setMousePos}
        onClick={() => onClick(mousePos)}
      >
        <div className="mouse-detection-container-hud">{children}</div>
      </S.ImageContainer>
    </>
  );
}

export default React.forwardRef(MouseDetector);
