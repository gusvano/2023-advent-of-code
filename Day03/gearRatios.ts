import fs from "fs";

const isDigit = (char: string) => /[0-9]/.test(char);
const isSymbol = (char: string) => char !== "." && !isDigit(char);

const GetNumber = (grid: string[], [x, y]: [number, number]): number => {
  const line = [...grid[y]];
  let number = "";
  let position = x;

  while (position >= 0 && isDigit(line[position])) {
    position -= 1;
  }

  if (!isDigit(line[position])) {
    position += 1;
  }

  while (isDigit(grid[y][position])) {
    number += grid[y][position];
    line[position] = ".";
    position += 1;
  }

  grid[y] = line.join("");

  return +number;
};

const CheckEachSurrounding = (
  grid: string[],
  [x, y]: [number, number]
): number => {
  if (
    grid.hasOwnProperty(y) &&
    grid[y].hasOwnProperty(x) &&
    isDigit(grid[y][x])
  ) {
    return GetNumber(grid, [x, y]);
  }

  return 0;
};

const gearRatiosSumP1 = () => {
  const inputFile = fs.readFileSync("Day03/gearRatios-input.txt", "utf8");
  const gearRatiosGrid = inputFile.split("\n");

  let sum = 0;

  for (let y = 0; y < gearRatiosGrid.length; y++) {
    for (let x = 0; x < gearRatiosGrid[y].length; x++) {
      if (!isSymbol(gearRatiosGrid[y][x])) {
        continue;
      }

      // Check surrounding for numbers
      sum += CheckEachSurrounding(gearRatiosGrid, [x, y - 1]);
      sum += CheckEachSurrounding(gearRatiosGrid, [x, y + 1]);
      sum += CheckEachSurrounding(gearRatiosGrid, [x + 1, y]);
      sum += CheckEachSurrounding(gearRatiosGrid, [x - 1, y]);
      sum += CheckEachSurrounding(gearRatiosGrid, [x + 1, y - 1]);
      sum += CheckEachSurrounding(gearRatiosGrid, [x - 1, y - 1]);
      sum += CheckEachSurrounding(gearRatiosGrid, [x + 1, y + 1]);
      sum += CheckEachSurrounding(gearRatiosGrid, [x - 1, y + 1]);
    }
  }

  return sum;
};

console.log("Part 1: ", gearRatiosSumP1());

const isGear = (char: string) => char === "*";

const gearRatiosSumP2 = () => {
  const inputFile = fs.readFileSync("Day03/gearRatios-input.txt", "utf8");
  const gearRatiosGrid = inputFile.split("\n");

  let sum = 0;

  for (let y = 0; y < gearRatiosGrid.length; y++) {
    for (let x = 0; x < gearRatiosGrid[y].length; x++) {
      if (!isGear(gearRatiosGrid[y][x])) {
        continue;
      }

      // Check surrounding for numbers
      const surroundingNums: number[] = [];
      surroundingNums.push(CheckEachSurrounding(gearRatiosGrid, [x, y - 1]));
      surroundingNums.push(CheckEachSurrounding(gearRatiosGrid, [x, y + 1]));
      surroundingNums.push(CheckEachSurrounding(gearRatiosGrid, [x + 1, y]));
      surroundingNums.push(CheckEachSurrounding(gearRatiosGrid, [x - 1, y]));
      surroundingNums.push(
        CheckEachSurrounding(gearRatiosGrid, [x + 1, y - 1])
      );
      surroundingNums.push(
        CheckEachSurrounding(gearRatiosGrid, [x - 1, y - 1])
      );
      surroundingNums.push(
        CheckEachSurrounding(gearRatiosGrid, [x + 1, y + 1])
      );
      surroundingNums.push(
        CheckEachSurrounding(gearRatiosGrid, [x - 1, y + 1])
      );

      const validGears = surroundingNums.filter((num) => num > 0);
      if (validGears.length === 2) {
        sum += validGears[0] * validGears[1];
      }
    }
  }

  return sum;
};

console.log("Part 2: ", gearRatiosSumP2());
