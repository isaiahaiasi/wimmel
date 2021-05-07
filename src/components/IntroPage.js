import React, { useContext } from "react";
import PageContext from "../PageContext";
import * as S from "../styled-components/styled-index";

export default function IntroPage() {
  const { handlePageChange, pages } = useContext(PageContext);

  return (
    <S.ContainerCentered>
      <S.Window>
        <h2>Intro!</h2>
        <S.Button onClick={() => handlePageChange(pages.mainGame)}>
          On to the game...
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
