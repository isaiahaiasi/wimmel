import React, { useState } from "react";
import { getBoxCollision } from "../logic/aabb";
import hitBox from "../logic/hitbox";
import MouseDetector from "./MouseDetector";

//! TEMP
import img from "../local_assets/default-wimmel.jpg";

//! PLACEHOLDER
function getBoxes() {
  return [
    hitBox(350, 100, 50, 100, "charles"),
    hitBox(200, 230, 100, 50, "henrietta"),
    hitBox(100, 300, 75, 75, "mcoffee"),
    hitBox(150, 400, 50, 65, "harold"),
  ];
}

//! PLACEHOLDER
// TODO: fetch image from cloud storage based on id
// eslint-disable-next-line no-unused-vars
function getImage(imageId) {
  console.log(img);
  return img;
}

function App() {
  const SELECTOR_BOX_WIDTH = 50;

  // TODO: fetch box data from storage, store as state
  const targetBoxes = getBoxes();
  const image = getImage();

  const [hits, setHits] = useState([]);

  const handleClick = ({ x, y }) => {
    const xOffset = x - SELECTOR_BOX_WIDTH / 2;
    const yOffset = y - SELECTOR_BOX_WIDTH / 2;
    const selectorBox = hitBox(
      xOffset,
      yOffset,
      SELECTOR_BOX_WIDTH,
      SELECTOR_BOX_WIDTH
    );

    // TODO: add check for if box is already hit
    const collided = targetBoxes.find(
      (target) =>
        getBoxCollision(target, selectorBox) &&
        !hits.some((hit) => hit.equals(target))
    );

    if (!collided) {
      return;
    }

    setHits((prev) => [...prev, collided]);
  };

  return (
    <div className="App">
      <div>Targets remaining: {targetBoxes.length - hits.length}</div>
      <MouseDetector onClick={handleClick}>
        <img
          src={image.src}
          style={{ width: "100%" }}
          alt="A wimmelbilder image, with characters to find"
        />
        {targetBoxes.map((box, i) => (
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
