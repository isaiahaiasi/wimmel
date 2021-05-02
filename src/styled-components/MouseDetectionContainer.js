import styled from "styled-components";

const MouseDetectionContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: grey;
  position: relative;
  overflow: hidden;

  div {
    pointer-events: none;
    user-select: none;
  }
`;

export default MouseDetectionContainer;
