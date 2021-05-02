import styled from "styled-components";

const MouseDetectionContainer = styled.div`
  box-sizing: border-box;
  height: 800px;
  width: 100%;
  background: grey;
  position: relative;

  div {
    pointer-events: none;
    user-select: none;
  }
`;

export default MouseDetectionContainer;