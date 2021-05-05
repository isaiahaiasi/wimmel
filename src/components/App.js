import React, { useState } from "react";
import IntroPage from "./IntroPage";
import MainGame from "./MainGame";
import ErrorPage from "./ErrorPage";
import PageContext, { pages } from "../PageContext";
import GameOverPage from "./GameOverPage";
import { useCollection } from "../hooks/useFirestoreHooks";

export default function App() {
  const [pageHistory, setPageHistory] = useState([pages.intro, pages.intro]);

  // TODO: add custom firebase hook
  const targetData = useCollection("targets");

  const getActivePage = () => {
    switch (pageHistory[0]) {
      case pages.intro:
        return <IntroPage />;
      case pages.mainGame:
        return <MainGame targetData={targetData} />;
      case pages.gameOver:
        return <GameOverPage />;
      default:
        return <ErrorPage />;
    }
  };

  // Store current page & last visited page
  const handlePageChange = (newPage) => {
    setPageHistory((previousHistory) => [newPage, previousHistory[0]]);
  };

  return (
    <div>
      <header>Hello!</header>
      <PageContext.Provider value={{ pages, pageHistory, handlePageChange }}>
        {getActivePage()}
      </PageContext.Provider>
    </div>
  );
}
