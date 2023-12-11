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

function expandUniverse(): string[] {
  const newUniverse: string[] = [];

  // Expand universe
  for (let x = 0; x < universe.length; x++) {
    let newRow = universe[x];

    emptyColumns.forEach((column, index) => {
      newRow =
        newRow.slice(0, column + index) + "." + newRow.slice(column + index);
    });

    if (emptyRows.includes(x)) {
      newUniverse.push(newRow);
    }

    newUniverse.push(newRow);
  }

  return newUniverse;
}

const expandedUniverse = expandUniverse();

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

const cosmicExpansionP1 = () => {
  const galaxyLocations = GetGalaxyLocations(expandedUniverse);
  let galaxy = galaxyLocations.shift();
  let totalDistance = 0;

  while (galaxy) {
    const [x, y] = galaxy;

    for (let i = 0; i < galaxyLocations.length; i++) {
      totalDistance +=
        Math.abs(x - galaxyLocations[i][0]) +
        Math.abs(y - galaxyLocations[i][1]);
    }

    galaxy = galaxyLocations.shift();
  }

  return totalDistance;
};

console.log("Part 1: ", cosmicExpansionP1());

function ConvertPoint([x, y]: Point): Point {
  const scale = 1000000;
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

const cosmicExpansionP2 = () => {
  const galaxyLocations = GetGalaxyLocations(universe);
  let galaxy = galaxyLocations.shift();
  let totalDistance = 0;

  while (galaxy) {
    const [x, y] = galaxy;
    const [xConverted, yConverted] = ConvertPoint([x, y]);

    for (let i = 0; i < galaxyLocations.length; i++) {
      const [x2, y2] = galaxyLocations[i];
      const [x2Converted, y2Converted] = ConvertPoint([x2, y2]);

      totalDistance +=
        Math.abs(xConverted - x2Converted) + Math.abs(yConverted - y2Converted);
    }

    galaxy = galaxyLocations.shift();
  }

  return totalDistance;
};

console.log("Part 2: ", cosmicExpansionP2());
