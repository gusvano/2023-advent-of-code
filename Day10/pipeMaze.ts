import fs from "fs";

const inputFile = fs.readFileSync("Day10/pipeMaze-input.txt", "utf8");
const maze = inputFile.split("\n");

type Point = [number, number];

enum Direction {
  North,
  East,
  South,
  West,
}

type Path = {
  direction: Direction;
  point: Point;
};

const startingPointX = maze.indexOf(
  maze.filter((line) => line.includes("S"))[0]
);
const startingPointY = maze[startingPointX].indexOf("S");
const walls: string[] = [];
walls.push([startingPointX, startingPointY].toString());

function GetNextPoint(path: Path): Path {
  const [x, y] = path.point;
  const direction = path.direction;

  switch (maze[x][y]) {
    case "|":
      return direction === Direction.North
        ? { direction, point: [x - 1, y] }
        : { direction, point: [x + 1, y] };
    case "-":
      return direction === Direction.East
        ? { direction, point: [x, y + 1] }
        : { direction, point: [x, y - 1] };
    case "L":
      return direction === Direction.South
        ? { direction: Direction.East, point: [x, y + 1] }
        : { direction: Direction.North, point: [x - 1, y] };
    case "J":
      return direction === Direction.South
        ? { direction: Direction.West, point: [x, y - 1] }
        : { direction: Direction.North, point: [x - 1, y] };
    case "7":
      return direction === Direction.North
        ? { direction: Direction.West, point: [x, y - 1] }
        : { direction: Direction.South, point: [x + 1, y] };
    case "F":
      return direction === Direction.North
        ? { direction: Direction.East, point: [x, y + 1] }
        : { direction: Direction.South, point: [x + 1, y] };
    default:
      throw new Error("Invalid path");
  }
}

function GetValidStartingPaths([x, y]: Point): Path[] {
  const paths: Path[] = [];

  if (maze[x - 1][y].match(/[\|F7]/)) {
    paths.push({ direction: Direction.North, point: [x - 1, y] });
  }

  if (maze[x + 1][y].match(/[\|LJ]/)) {
    paths.push({ direction: Direction.South, point: [x + 1, y] });
  }

  if (maze[x][y - 1].match(/[-LF]/)) {
    paths.push({ direction: Direction.West, point: [x, y - 1] });
  }

  if (maze[x][y + 1].match(/[-J7]/)) {
    paths.push({ direction: Direction.East, point: [x, y + 1] });
  }

  return paths;
}

const isSamePoint = ([x1, y1]: Point, [x2, y2]: Point): boolean =>
  x1 === x2 && y1 === y2;

const pipeMazeP1 = () => {
  let steps = 1;
  let currentPaths = GetValidStartingPaths([startingPointX, startingPointY]);

  while (!isSamePoint(currentPaths[0].point, currentPaths[1].point)) {
    walls.push(currentPaths[0].point.toString());
    walls.push(currentPaths[1].point.toString());
    currentPaths[0] = GetNextPoint(currentPaths[0]);
    currentPaths[1] = GetNextPoint(currentPaths[1]);
    steps++;
  }

  walls.push(currentPaths[0].point.toString());

  return steps;
};

console.log("Part 1: ", pipeMazeP1());

const pipeMazeP2 = () => {
  let insideCount = 0;
  const width = maze[0].length;
  const height = maze.length;

  for (let x = 1; x < height; x++) {
    for (let y = 1; y < width; y++) {
      if (walls.includes([x, y].toString())) {
        continue;
      }

      let crosses = 0;

      let [x2, y2] = [x, y];
      while (y2 < height && x2 < width) {
        const char = maze[x2][y2];
        if (walls.includes([x2, y2].toString()) && char != "L" && char != "7") {
          crosses++;
        }

        x2++;
        y2++;
      }

      if (crosses % 2 == 1) {
        insideCount++;
      }
    }
  }

  return insideCount;
};

console.log("Part 2: ", pipeMazeP2());
