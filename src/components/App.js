import React, { useState } from "react";
import { getBoxCollision } from "../logic/aabb";
import hitBox from "../logic/hitbox";
import MouseDetector from "./MouseDetector";

function App() {
  const BOX_WIDTH = 50;

  const BOXES = [
    hitBox(350, 100, 50, 100, "charles"),
    hitBox(200, 230, 100, 50, "henrietta"),
    hitBox(100, 300, 75, 75, "mcoffee"),
    hitBox(150, 400, 50, 65, "harold"),
  ];

  const [hits, setHits] = useState([]);

  const handleClick = ({ x, y }) => {
    const xOffset = x - BOX_WIDTH / 2;
    const yOffset = y - BOX_WIDTH / 2;
    const box = hitBox(xOffset, yOffset, BOX_WIDTH, BOX_WIDTH);

    // TODO: add check for if box is already hit
    const collided = BOXES.find(
      (target) =>
        getBoxCollision(target, box) && !hits.some((hit) => hit.equals(target))
    );

    if (!collided) {
      return;
    }

    setHits((prev) => [...prev, collided]);
  };

  return (
    <div className="App">
      <div>Targets remaining: {BOXES.length - hits.length}</div>
      <MouseDetector onClick={handleClick}>
        {BOXES.map((box, i) => (
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
        <ul>
          {hits.map((hit, i) => (
            <li key={i}>{hit.boxName}</li>
          ))}
        </ul>
      </MouseDetector>
    </div>
  );
}

export default App;
