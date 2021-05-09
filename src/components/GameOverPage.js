import React, { useContext } from "react";
import { useAddDocument } from "../hooks/useFirestoreHooks";
import displayTime from "../logic/display-time";
import PageContext from "../PageContext";
import * as S from "../styled-components/_styled-index";
import Scoreboard from "./Scoreboard";

export default function GameOverPage({ time }) {
  const { handlePageChange, pages } = useContext(PageContext);
  const score = {
    score: time,
    name: "test_name",
  };

  useAddDocument("highscores", score);

  return (
    <S.ContainerCentered>
      <S.Window>
        <h2>You won! Good job!</h2>
        <div>Your time was {displayTime(time)}</div>
        <Scoreboard />
        <S.Button onClick={() => handlePageChange(pages.intro)}>
          Play again?
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
