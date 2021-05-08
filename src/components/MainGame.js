import React, { useContext, useState } from "react";
import { getBoxCollision } from "../logic/aabb";
import hitBox, { getScaledBox } from "../logic/hitbox";
import MouseDetector from "./MouseDetector";
import useRefSize from "../hooks/useRefSize";
import useMousePosition from "../hooks/useMousePosition";
import * as S from "../styled-components/_styled-index";
import PageContext from "../PageContext";

//! TEMP
import img from "../local_assets/default-wimmel.jpg";
import Stopwatch from "./Stopwatch";

//! PLACEHOLDER
// TODO: fetch image from cloud storage based on id
// (haven't implemented yet b/c I haven't optimized image)
// eslint-disable-next-line no-unused-vars
function getImage(imageId) {
  return img;
}

function MainGame({ targetData }) {
  const SELECTOR_BOX_WIDTH = 50;
  const image = getImage();
  const [targetDataSnapshot] = targetData;
  const targetBoxes = targetDataSnapshot?.docs.map((target) => {
    const d = target.data();
    return hitBox(d.x, d.y, d.width, d.height, d.targetName);
  });

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
      <S.StickyContainer>
        <S.Window>
          <div>Time remaining:</div>
          <div style={{ textAlign: "center" }}>
            <Stopwatch />
          </div>
        </S.Window>
      </S.StickyContainer>
      <MouseDetector
        mousePos={mousePos}
        setMousePos={setMousePos}
        onClick={handleClick}
        ref={containerRef}
      >
        <img
          src={image}
          style={{ width: "100%", zIndex: -100 }}
          alt="A wimmelbilder, with characters to find"
        />

        {targetBoxes && renderBoxes(targetBoxes)}
        {renderBoxes(hits, { border: "3px solid white", background: "none" })}

        <S.MouseDetectionSight
          pos={mousePos}
          style={{ top: mousePos?.y, left: mousePos?.x }}
        >
          {renderMousePos()}
        </S.MouseDetectionSight>
      </MouseDetector>
    </div>
  );
}

export default MainGame;
