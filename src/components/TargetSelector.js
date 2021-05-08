import React from "react";

export default function TargetSelector({ targets, position, onSelect }) {
  console.log(targets);
  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        pointerEvents: "all",
      }}
    >
      {targets.map((target) => (
        <button key={target.boxName} onClick={() => onSelect(target)}>
          {target.boxName}
        </button>
      ))}
    </div>
  );
}
