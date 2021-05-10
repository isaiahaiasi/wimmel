import React from "react";
import displayTime from "../logic/display-time";

export default function Scoreboard({ scores }) {
  return (
    <div>
      <h3>High scores:</h3>
      {scores ? (
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
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
