import React from "react";
import { useCollection } from "../hooks/useFirestoreHooks";
import displayTime from "../logic/display-time";

export default function Scoreboard() {
  const [snapshot, isLoading, error] = useCollection("highscores");
  const scores = snapshot?.docs.map((score) => ({
    id: score.id,
    ...score.data(),
  }));

  return (
    <div>
      <h3>High scores:</h3>
      {error && <p>Oops! Error getting high score data!</p>}
      {isLoading && <p>loading...</p>}
      {snapshot && (
        <table>
          <tbody>
            {scores.map((score, i) => (
              <tr key={score.id ?? i}>
                <td>{score.name}</td>
                <td>{displayTime(score.score)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
