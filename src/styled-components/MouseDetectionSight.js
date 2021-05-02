import styled from "styled-components";

const MouseDetectionSight = styled.div`
  position: absolute;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  backface-visibility: hidden; // should force hardware acceleration
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
`;

export default MouseDetectionSight;
