import React, { useContext, useState } from "react";
import { addHighscore, useGetHighscores } from "../hooks/useFirestoreHooks";
import displayTime from "../logic/display-time";
import PageContext from "../PageContext";
import * as S from "../styled-components/_styled-index";
import Scoreboard from "./Scoreboard";

export default function GameOverPage({ time }) {
  const { handlePageChange, pages } = useContext(PageContext);

  const [didAddHighscore, setDidAddHighscore] = useState(false);
  const [userName, setUserName] = useState("Charlie");
  const [scoresSnapshot] = useGetHighscores();

  const scores = scoresSnapshot?.docs
    ?.map((score) => ({
      id: score.id,
      ...score.data(),
    }))
    .sort((a, b) => a.score - b.score);

  const didMakeHighscore = (score) =>
    scores && (scores[scores.length - 1]?.score > score || scores.length < 5);

  // easier to lie about the database pull than to refresh when the real score is added
  const getDynamicScore = () =>
    didMakeHighscore(time)
      ? [...scores, { name: userName, score: time }].sort(
          (a, b) => a.score - b.score
        )
      : scores;

  const showNameInput = () => didMakeHighscore(time) && !didAddHighscore;

  const handleAddScore = (e) => {
    e.preventDefault();
    const score = {
      score: time,
      name: userName,
    };

    addHighscore(score);
    setDidAddHighscore(true);
  };

  const getScoreMessage = (score) => {
    if (didMakeHighscore(score)) {
      if (score <= scores[0].score) {
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
        <h2>{getScoreMessage(time)}</h2>
        <div>Your time was {displayTime(time)}</div>
        {showNameInput() ? (
          <form>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit" onClick={handleAddScore}>
              Submit highscore!
            </button>
          </form>
        ) : (
          <Scoreboard scores={getDynamicScore()} />
        )}
        <S.Button onClick={() => handlePageChange(pages.intro)}>
          Play again?
        </S.Button>
      </S.Window>
    </S.ContainerCentered>
  );
}
