import React, { useContext, useEffect, useState } from "react";
import { addHighscore, useGetHighscores } from "../hooks/useFirestoreHooks";
import displayTime from "../logic/display-time";
import PageContext from "../PageContext";
import * as S from "../styled-components/_styled-index";
import Scoreboard from "./Scoreboard";

export default function GameOverPage({ time }) {
  const { handlePageChange, pages } = useContext(PageContext);

  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState("Charlie");
  const [scoresSnapshot] = useGetHighscores();

  const scores = scoresSnapshot?.docs?.map((score) => ({
    id: score.id,
    ...score.data(),
  }));

  const didMakeHighscore = (score) =>
    scores && (scores[scores.length - 1].score > score || scores.length < 5);

  useEffect(() => {
    if (didMakeHighscore(time)) {
      setShowNameInput(true);
    }
  }, [scores]);

  const handleAddScore = () => {
    const score = {
      score: time,
      name: userName,
    };
    console.log("score added!");
    // TODO: get player's name, add their score to scoreboard
    addHighscore(score);
  };

  const getScoreMessage = (score) => {
    if (didMakeHighscore(score)) {
      if (score > scores[0]) {
        return "Fantastic! You're number 1!!!";
      } else {
        return "High score! Great job!";
      }
    } else {
      return "You found all the characters! Try again for a high score?";
    }
  };

  return (
    <S.ContainerCentered>
      <S.Window>
        <h2>{getScoreMessage()}</h2>
        <div>Your time was {displayTime(time)}</div>
        <Scoreboard scores={scores} />
        <S.Button onClick={() => handlePageChange(pages.intro)}>
          Play again?
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
