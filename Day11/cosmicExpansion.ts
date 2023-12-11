import fs from "fs";

const inputFile = fs.readFileSync("Day11/cosmicExpansion-input.txt", "utf8");
const universe = inputFile.split("\n");

type Point = [number, number];

function GetEmptyColumns(): number[] {
  const emptyColumns: number[] = [];
  for (let y = 0; y < universe[0].length; y++) {
    let isEmpty = true;

    for (let x = 0; x < universe.length; x++) {
      if (universe[x][y] !== ".") {
        isEmpty = false;
        break;
      }
    }

    if (isEmpty) {
      emptyColumns.push(y);
    }
  }

  return emptyColumns;
}

const emptyColumns = GetEmptyColumns();

function GetEmptyRows(): number[] {
  const emptyRows: number[] = [];
  for (let x = 0; x < universe.length; x++) {
    const isEmpty = universe[x].split("").every((char) => char === ".");
    if (isEmpty) {
      emptyRows.push(x);
    }
  }

  return emptyRows;
}

const emptyRows = GetEmptyRows();

function GetGalaxyLocations(universe: string[]): Point[] {
  const galaxyLocations: Point[] = [];

  for (let x = 0; x < universe.length; x++) {
    for (let y = 0; y < universe[x].length; y++) {
      if (universe[x][y] === "#") {
        galaxyLocations.push([x, y]);
      }
    }
  }

  return galaxyLocations;
}

function ConvertPoint([x, y]: Point, scale: number): Point {
  const crossedColumnsLength = emptyColumns.filter(
    (column) => column < y
  ).length;
  const crossedRowsLength = emptyRows.filter((row) => row < x).length;

  const crossedColumnsDistance =
    crossedColumnsLength * scale - crossedColumnsLength;
  const crossedRowsDistance = crossedRowsLength * scale - crossedRowsLength;

  return [
    Math.max(x + crossedRowsDistance, 0),
    Math.max(y + crossedColumnsDistance, 0),
  ];
}

function GetTotalDistance(scale: number): number {
  const galaxyLocations = GetGalaxyLocations(universe).map((point) =>
    ConvertPoint(point, scale)
  );
  let galaxy = galaxyLocations.shift();
  let totalDistance = 0;

  while (galaxy) {
    const [x, y] = galaxy;

    for (let i = 0; i < galaxyLocations.length; i++) {
      const [x2, y2] = galaxyLocations[i];

      totalDistance += Math.abs(x - x2) + Math.abs(y - y2);
    }

    galaxy = galaxyLocations.shift();
  }

  return totalDistance;
}

console.log("Part 1: ", GetTotalDistance(2));
console.log("Part 2: ", GetTotalDistance(1000000));
