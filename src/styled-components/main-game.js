import styled from "styled-components";

export const ImageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  overflow: hidden;

  /* TODO: make animated gradient skeleton using colors from wimmel */
  background: grey;

  div {
    pointer-events: none;
    user-select: none;
  }
`;

export const MouseDetectionSight = styled.div`
  position: absolute;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  backface-visibility: hidden; // to force hardware acceleration
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
`;
