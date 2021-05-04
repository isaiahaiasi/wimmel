import React, { useContext } from "react";
import PageContext from "../PageContext";

export default function IntroPage() {
  const { handlePageChange, pages } = useContext(PageContext);

  return (
    <div>
      <h2>Intro!</h2>
      <button onClick={() => handlePageChange(pages.mainGame)}>
        On to the game...
      </button>
    </div>
  );
}
