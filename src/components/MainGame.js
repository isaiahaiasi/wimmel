import React, { useContext, useState } from "react";

import PageContext from "../PageContext";
import useRefSize from "../hooks/useRefSize";
import useMousePosition from "../hooks/useMousePosition";

import MouseDetector from "./MouseDetector";
import TargetSelector from "./TargetSelector";
import Stopwatch from "./Stopwatch";

import { getBoxCollision } from "../logic/aabb";
import hitBox, { getScaledBox } from "../logic/hitbox";

import * as S from "../styled-components/_styled-index";

//! TEMP
import img from "../local_assets/default-wimmel.jpg";

function MainGame({ targetData }) {
  const SELECTOR_BOX_WIDTH = 50;
  const image = img;
  const [targetDataSnapshot] = targetData;

  const targetBoxes = targetDataSnapshot?.docs.map((target) => {
    const d = target.data();
    return hitBox(d.x, d.y, d.width, d.height, d.targetName);
  });

  const { handlePageChange, pages } = useContext(PageContext);

  const [hits, setHits] = useState([]);
  const [showTargetBox, setShowTargetBox] = useState(false);

  const getRemainingTargets = () => {
    return targetBoxes.filter((target) => {
      return hits.every((hit) => !hit.equals(target));
    });
  };

  const handleSetMousePos = (...args) => {
    if (!showTargetBox) {
      setMousePos(...args);
    }
  };

  const endGame = () => {
    handlePageChange(pages.gameOver);
  };

  const handleClick = () => {
    setShowTargetBox(true);
  };

  const handleTargetSelect = (selectedTarget) => {
    const xOffset = mousePos.x - SELECTOR_BOX_WIDTH / 2;
    const yOffset = mousePos.y - SELECTOR_BOX_WIDTH / 2;

    const selectorBox = getScaledBox(
      hitBox(xOffset, yOffset, SELECTOR_BOX_WIDTH, SELECTOR_BOX_WIDTH),
      1 / containerSize.width
    );

    const success =
      getBoxCollision(selectorBox, selectedTarget) &&
      !hits.some((hit) => hit.equals(selectedTarget));

    if (success) {
      if (hits.length === targetBoxes.length - 1) {
        endGame();
      } else {
        setHits((prev) => [...prev, selectedTarget]);
      }
    }

    setShowTargetBox(false);
  };

  // * MAKE BOX POSITIONS RELATIVE TO CONTAINER SIZE
  const [containerSize, containerRef] = useRefSize();
  const [mousePos, setMousePos] = useMousePosition();

  //! FOR DEBUGGING
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
        {/* ! FOR DEBUGGING */}
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
      <S.StickyContainer style={{ textAlign: "center", pointerEvents: "none" }}>
        <S.Window>
          <div>Targets remaining: {targetBoxes.length - hits.length}</div>
          <div>Time remaining:</div>
          <div>
            <Stopwatch />
          </div>
        </S.Window>
      </S.StickyContainer>
      <MouseDetector
        mousePos={mousePos}
        setMousePos={handleSetMousePos}
        onClick={!showTargetBox ? handleClick : () => setShowTargetBox(false)}
        ref={containerRef}
      >
        <img
          src={image}
          style={{ width: "100%", zIndex: -100 }}
          alt="A wimmelbilder, with characters to find"
        />

        {targetBoxes && renderBoxes(targetBoxes)}
        {renderBoxes(hits, { border: "3px solid white", background: "none" })}

        {showTargetBox ? (
          <TargetSelector
            targets={getRemainingTargets()}
            position={mousePos}
            onSelect={handleTargetSelect}
          />
        ) : (
          <S.MouseDetectionSight
            pos={mousePos}
            style={{ top: mousePos?.y, left: mousePos?.x }}
          >
            {renderMousePos()}
          </S.MouseDetectionSight>
        )}
      </MouseDetector>
    </div>
  );
}

export default MainGame;
