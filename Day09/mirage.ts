import fs from "fs";

const inputFile = fs.readFileSync("Day09/mirage-input.txt", "utf8");

function FindProjection(difference: number[]): number {
  if (difference.every((d) => d === 0)) {
    return 0;
  }

  const newDifference: number[] = [];

  for (let i = 0; i < difference.length - 1; i++) {
    newDifference.push(difference[i + 1] - difference[i]);
  }

  return (
    newDifference[newDifference.length - 1] + FindProjection(newDifference)
  );
}

const mirageP1 = inputFile
  .split("\n")
  .map((line) => {
    const initialDifference = line.split(" ").map(Number);

    const projection = FindProjection(initialDifference);

    return projection + initialDifference[initialDifference.length - 1];
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Part 1: ", mirageP1);

function FindBackwardsProjection(difference: number[]): number {
  if (difference.every((d) => d === 0)) {
    return 0;
  }

  const newDifference: number[] = [];

  for (let i = 0; i < difference.length - 1; i++) {
    newDifference.push(difference[i + 1] - difference[i]);
  }

  return newDifference[0] - FindBackwardsProjection(newDifference);
}

const mirageP2 = inputFile
  .split("\n")
  .map((line) => {
    const initialDifference = line.split(" ").map(Number);

    const backwardsProjection = FindBackwardsProjection(initialDifference);

    return initialDifference[0] - backwardsProjection;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Part 2: ", mirageP2);
