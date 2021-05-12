import React, { useContext } from "react";
import PageContext from "../PageContext";
import * as S from "../styled-components/_styled-index";
import TargetList from "./TargetList";

export default function IntroPage({ targets }) {
  const { handlePageChange, pages } = useContext(PageContext);

  return (
    <S.ContainerCentered>
      <S.Window>
        <h2>Intro!</h2>
        <p>Try to find these characters:</p>
        <TargetList targets={targets} />
        <S.Button onClick={() => handlePageChange(pages.mainGame)}>
          On to the game...
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
