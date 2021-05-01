// TODO: given two { x, y, width, height }, check if overlapping
export default function getBoxCollision(box1, box2) {
  if ([box1, box2].some(box => !box || !box.x || !box.y || !box.width || !box.height)) {
    throw new TypeError(`${box1} or ${box2} is not a valid parameter for getBoxCollision`);
  }

  return (box1.x < (box2.x + box2.width)) &&
    ((box1.x + box1.width) > box2.x) &&
    (box1.y < (box2.y + box2.height)) &&
    ((box1.y + box1.height) > box2.y);
}