import styled from "styled-components";

export const TargetList = styled.ul`
  list-style: none;
  padding: 0;
  & li {
    margin:0;

    & p {
      margin: 0;
    }
  }

  & img {
    width: 100px;
  }
`;