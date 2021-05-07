import styled from "styled-components";

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
  background: white;
  color: black;
  box-sizing: border-box;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0.1rem 0.1rem 1rem rgb(9, 17, 31);
`;

export const Button = styled.button`
  width: 100%;
  color: black;
  font-size: 1rem;
  line-height: 1.5rem;
  background-color: lightblue;
  border-radius: 0.5rem;
  border-style: none;
  padding: 0.5rem 1rem;
  border-bottom: solid 2px slategrey;
`;
