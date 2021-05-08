import React from "react";
import * as S from "../styled-components/_styled-index";

function MouseDetector({ mousePos, setMousePos, onClick, children }, ref) {
  return (
    <>
      <S.ImageContainer
        ref={ref}
        onMouseMove={setMousePos}
        onClick={() => onClick(mousePos)}
      >
        <div>{children}</div>
      </S.ImageContainer>
    </>
  );
}

export default React.forwardRef(MouseDetector);
