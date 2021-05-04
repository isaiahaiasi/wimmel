import React, { useContext } from "react";
import PageContext from "../PageContext";

export default function GameOverPage() {
  const { handlePageChange, pages } = useContext(PageContext);

  return (
    <div>
      You won! Good job!
      <button onClick={() => handlePageChange(pages.intro)}>Play again?</button>
    </div>
  );
}
