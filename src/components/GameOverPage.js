import React, { useContext } from "react";
import displayTime from "../logic/display-time";
import PageContext from "../PageContext";
import * as S from "../styled-components/_styled-index";

export default function GameOverPage({ time }) {
  const { handlePageChange, pages } = useContext(PageContext);

  return (
    <S.ContainerCentered>
      <S.Window>
        <h2>You won! Good job!</h2>
        <div>Your time was {displayTime(time)}</div>
        <S.Button onClick={() => handlePageChange(pages.intro)}>
          Play again?
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
