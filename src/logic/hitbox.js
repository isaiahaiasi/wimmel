const hitBox = (x, y, width, height, boxName) => {
  const equals = (box) =>
    box.x === x &&
    box.y === y &&
    box.width === width &&
    box.height === height &&
    box.boxName === boxName;

  return {
    x,
    y,
    width,
    height,
    boxName,
    equals,
  };
};

export const getScaledBox = (box, scale) => {
  return {
    x: box.x * scale,
    y: box.y * scale,
    width: box.width * scale,
    height: box.height * scale,
  };
};

export default hitBox;
