import React, { useState } from "react";

import { useCollection } from "../hooks/useFirestoreHooks";
import PageContext, { pages } from "../PageContext";

import IntroPage from "./IntroPage";
import MainGame from "./MainGame";
import ErrorPage from "./ErrorPage";
import GameOverPage from "./GameOverPage";
import Banner from "./Banner";

export default function App() {
  const [pageHistory, setPageHistory] = useState([pages.intro, pages.intro]);

  // TODO: find a better way to store this? (since I'm only setting it ONCE)
  const [startTime, setStartTime] = useState();

  const startTimer = () => {
    // TODO (?): trigger cloud function to save serverside timestamp?
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const targetData = useCollection("targets");

  const getActivePage = () => {
    switch (pageHistory[0]) {
      case pages.intro: {
        return <IntroPage />;
      }
      case pages.mainGame: {
        startTimer();
        return <MainGame targetData={targetData} />;
      }
      case pages.gameOver: {
        // TODO: if I'm storing start time using cloud function
        // need to do the same with the endTimes
        const endTime = Date.now();
        const finalTime = endTime - startTime;
        return <GameOverPage time={finalTime} />;
      }
      default: {
        return <ErrorPage />;
      }
    }
  };

  // Store current page & last visited page
  const handlePageChange = (newPage) => {
    // TODO: come up w a better solution for resetting timer...
    if (newPage === pages.mainGame) {
      setStartTime(null);
    }

    setPageHistory((previousHistory) => [newPage, previousHistory[0]]);
  };

  return (
    <div>
      <Banner />
      <PageContext.Provider value={{ pages, pageHistory, handlePageChange }}>
        {getActivePage()}
      </PageContext.Provider>
    </div>
  );
}
