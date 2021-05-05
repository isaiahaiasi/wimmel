import React, { useContext, useState } from "react";
import { getBoxCollision } from "../logic/aabb";
import hitBox, { getScaledBox } from "../logic/hitbox";
import MouseDetector from "./MouseDetector";
import useRefSize from "../hooks/useRefSize";
import useMousePosition from "../hooks/useMousePosition";
import MouseDetectionSight from "../styled-components/MouseDetectionSight";
import PageContext from "../PageContext";

//! TEMP
import img from "../local_assets/default-wimmel.jpg";

// //! PLACEHOLDER
// function getBoxes() {
//   return [
//     hitBox(0.508, 0.225, 0.025, 0.042, "yubaba"),
//     hitBox(0.2, 0.23, 0.03, 0.05, "TEMP_A"),
//     hitBox(0.1, 0.3, 0.075, 0.075, "TEMP_B"),
//     hitBox(0.15, 0.4, 0.05, 0.065, "TEMP_C"),
//   ];
// }

//! PLACEHOLDER
// TODO: fetch image from cloud storage based on id
// eslint-disable-next-line no-unused-vars
function getImage(imageId) {
  return img;
}

function MainGame({ targetData }) {
  const SELECTOR_BOX_WIDTH = 50;
  const image = getImage();
  const [targetBoxes] = targetData;

  const { handlePageChange, pages } = useContext(PageContext);

  const [hits, setHits] = useState([]);

  const endGame = () => {
    handlePageChange(pages.gameOver);
  };

  const handleClick = ({ x, y }) => {
    const xOffset = x - SELECTOR_BOX_WIDTH / 2;
    const yOffset = y - SELECTOR_BOX_WIDTH / 2;
    const selectorBox = getScaledBox(
      hitBox(xOffset, yOffset, SELECTOR_BOX_WIDTH, SELECTOR_BOX_WIDTH),
      1 / containerSize.width
    );

    const collided = targetBoxes.find(
      (target) =>
        getBoxCollision(target, selectorBox) &&
        !hits.some((hit) => hit.equals(target))
    );

    if (collided) {
      // if this would be the final box, go to game over page
      if (hits.length === targetBoxes.length - 1) {
        endGame();
      } else {
        setHits((prev) => [...prev, collided]);
      }
    }
  };

  // * MAKE BOX POSITIONS RELATIVE TO CONTAINER SIZE
  const [containerSize, containerRef] = useRefSize();
  const [mousePos, setMousePos] = useMousePosition();

  const getPixelPosAsRatio = (pos) => ({
    x: pos?.x / containerSize.width,
    y: pos?.y / containerSize.width,
  });

  function renderMousePos() {
    return (
      <div
        style={{
          color: "white",
          overflowWrap: "none",
          paddingLeft: SELECTOR_BOX_WIDTH + 4,
          textShadow: "5px 5px 12px black",
        }}
      >
        x:{getPixelPosAsRatio(mousePos).x ?? "no mouse position!"}
        <br />
        y:{getPixelPosAsRatio(mousePos).y ?? "no mouse position!"}
      </div>
    );
  }

  function renderBoxes(boxes, style) {
    return boxes.map((box, i) => {
      const scaledBox = getScaledBox(box, containerSize.width);
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            boxSizing: "border-box",
            top: scaledBox.y,
            left: scaledBox.x,
            width: scaledBox.width,
            height: scaledBox.height,
            background: "rgba(255, 0, 0, .3)",
            ...style,
          }}
        />
      );
    });
  }

  return (
    <div className="App">
      <div>Targets remaining: {targetBoxes.length - hits.length}</div>

      <div>
        container size: ({containerSize.width}x{containerSize.height})
      </div>
      <MouseDetector
        mousePos={mousePos}
        setMousePos={setMousePos}
        onClick={handleClick}
        ref={containerRef}
      >
        <img
          src={image}
          style={{ width: "100%" }}
          alt="A wimmelbilder, with characters to find"
        />

        {renderBoxes(targetBoxes)}
        {renderBoxes(hits, { border: "3px solid white", background: "none" })}

        <MouseDetectionSight
          pos={mousePos}
          style={{ top: mousePos?.y, left: mousePos?.x }}
        >
          {renderMousePos()}
        </MouseDetectionSight>
      </MouseDetector>
    </div>
  );
}

export default MainGame;
