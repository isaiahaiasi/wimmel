import React from "react";

export const pages = Object.freeze({
  intro: "intro",
  mainGame: "maingame",
  gameOver: "gameOver",
});

// Note: argument is a fallback for unwrapped context consumers
const PageContext = React.createContext({ pages });

export default PageContext;
