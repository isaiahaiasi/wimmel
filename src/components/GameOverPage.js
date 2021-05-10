import React, { useContext, useEffect } from "react";
import { addHighscore, useGetHighscores } from "../hooks/useFirestoreHooks";
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

  const [snapshot] = useGetHighscores();

  console.log(snapshot);
  const scores = snapshot?.docs?.map((score) => ({
    id: score.id,
    ...score.data(),
  }));

  useEffect(() => {
    if (
      scores &&
      (scores[scores.length - 1].score > score.score || scores.length < 5)
    ) {
      console.log("score added!");
      // TODO: get player's name, add their score to scoreboard
      addHighscore(score);
    }
  }, [scores]);

  return (
    <S.ContainerCentered>
      <S.Window>
        <h2>You won! Good job!</h2>
        <div>Your time was {displayTime(time)}</div>
        <Scoreboard scores={scores} />
        <S.Button onClick={() => handlePageChange(pages.intro)}>
          Play again?
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
