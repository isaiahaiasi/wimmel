import React, { useContext } from "react";
import PageContext from "../PageContext";
import * as S from "../styled-components/_styled-index";

export default function IntroPage() {
  const { handlePageChange, pages } = useContext(PageContext);

  return (
    <S.ContainerCentered>
      <S.Window>
        <h2>Intro!</h2>
        <p>Try to find these characters:</p>
        <ul>
          <li>
            <span>Yubaba</span>
            <img />
          </li>
          <li>
            <span>Gwyndolin</span>
            <img />
          </li>
          <li>
            <span>Ryuk</span>
            <img />
          </li>
          <li>
            <span>Philip J. Fry</span>
            <img />
          </li>
        </ul>
        <S.Button onClick={() => handlePageChange(pages.mainGame)}>
          On to the game...
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
