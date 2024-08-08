import Queue from "./queue.mjs";
const [boardWidth, boardHeight] = [8, 8];

export default function knightMoves(pos, target) {
  if (!isCoordinate(pos)) return "Invalid position";
  if (!isCoordinate(target)) return "Invalid target";

  const queue = new Queue();
  let targetFound = false;
  let currentMove;

  queue.enqueue(createMoveNode(pos));
  while (!targetFound) {
    currentMove = queue.dequeue();
    const curPos = currentMove.position;
    if (curPos[0] === target[0] && curPos[1] === target[1]) {
      targetFound = true;
    } else {
      currentMove.getNextMoves().forEach((move) => {
        if (move) queue.enqueue(move);
      });
    }
  }
  return printMoves(currentMove.path);
}

function isCoordinate(xy) {
  return (
    Array.isArray(xy) &&
    xy.length === 2 &&
    xy.every((n) => typeof n === "number") &&
    xy.every((n) => n >= 0) &&
    xy[0] < boardWidth &&
    xy[1] < boardHeight
  );
}

function createMoveNode(position, p = []) {
  if (!isCoordinate(position)) return;
  const [x, y] = position;
  const path = [...p, position];
  function getNextMoves() {
    // couldnt think of a nice way to generate these that wasnt overly complicated :/
    return [
      createMoveNode([x + 1, y + 2], path),
      createMoveNode([x + 2, y + 1], path),
      createMoveNode([x + 1, y - 2], path),
      createMoveNode([x + 2, y - 1], path),
      createMoveNode([x - 1, y + 2], path),
      createMoveNode([x - 2, y + 1], path),
      createMoveNode([x - 1, y - 2], path),
      createMoveNode([x - 2, y - 1], path),
    ];
  }
  return {
    position,
    path,
    getNextMoves,
  };
}

function printMoves(path) {
  const plural = path.length > 2 || path.length < 2 ? "s" : "";
  console.log(`Target position reached in ${path.length - 1} move${plural}.`);
  console.log(`Path taken:`);
  console.log(path);
}
