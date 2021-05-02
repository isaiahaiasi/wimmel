import React, { useState } from "react";
import hitBox from "../logic/hitbox";
import MouseDetector from "./MouseDetector";

function App() {
  const BOX_WIDTH = 50;
  const [clickBoxes, setClickBoxes] = useState([]);

  const handleClick = ({ x, y }) => {
    const xOffset = x - BOX_WIDTH / 2;
    const yOffset = y - BOX_WIDTH / 2;
    const box = hitBox(xOffset, yOffset, BOX_WIDTH, BOX_WIDTH);
    setClickBoxes((prev) => [...prev, box]);
  };

  return (
    <div className="App">
      hello world
      <MouseDetector onClick={handleClick}>
        {clickBoxes.map((box, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: box.y,
              left: box.x,
              width: box.width,
              height: box.height,
              background: "green",
            }}
          />
        ))}
      </MouseDetector>
    </div>
  );
}

export default App;
