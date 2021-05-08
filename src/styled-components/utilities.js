import styled from "styled-components";
import { colors as c } from "./_style-units";

export const ContainerCentered = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Window = styled.div`
  background: ${c.beige};
  color: ${c.blue};
  box-sizing: border-box;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0.1rem 0.1rem 1rem rgb(9, 17, 31);
`;

export const StickyContainer = styled.div`
  position: sticky;
  top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

export const Button = styled.button`
  width: 100%;
  color: white;
  text-shadow: 3px 3px 0 ${c.blue} inset;

  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.5rem;
  background-color: ${c.red};
  border-radius: 0.5rem;
  border-style: none;
  padding: 0.5rem 1rem;
  border-bottom: solid 2px ${c.red};
`;
