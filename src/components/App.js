import React, { useState } from "react";
import IntroPage from "./IntroPage";
import MainGame from "./MainGame";
import ErrorPage from "./ErrorPage";
import PageContext, { pages } from "../PageContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("intro");

  const getActivePage = () => {
    switch (currentPage) {
      case "intro":
        return <IntroPage />;
      case "maingame":
        return <MainGame />;
      default:
        return <ErrorPage />;
    }
  };

  // (might want to mediate this, so I'm creating a handler)
  const handlePageChange = setCurrentPage;

  return (
    <div>
      <header>Hello!</header>
      <PageContext.Provider value={{ pages, currentPage, handlePageChange }}>
        {getActivePage()}
      </PageContext.Provider>
    </div>
  );
}
