import React, { useContext } from "react";
import displayTime from "../logic/display-time";
import PageContext from "../PageContext";

export default function GameOverPage({ time }) {
  const { handlePageChange, pages } = useContext(PageContext);

  return (
    <div>
      <h2>You won! Good job!</h2>
      <div>Your time was {time}</div>
      <div>Your time was {time / 1000}</div>
      <div>Your time was {displayTime(time)}</div>
      <button onClick={() => handlePageChange(pages.intro)}>Play again?</button>
    </div>
  );
}
