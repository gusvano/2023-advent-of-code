import fs from "fs";

const totalRed = 12;
const totalGreen = 13;
const totalBlue = 14;

const inputFile = fs.readFileSync("Day02/cubeConundrum-input.txt", "utf8");

const conundrumSumPt1 = inputFile
  .split("\n")
  .map((line) => {
    const conundrumPattern = /Game (\d*): (.*)/g;

    const gameMatch = conundrumPattern.exec(line);

    if (!gameMatch) return 0;

    const gameId = gameMatch.at(1);

    const gameplayString = gameMatch.at(2);
    const cubeSets = gameplayString?.split(";") ?? [];

    const isValidGame = cubeSets.every((cubeSet) => {
      const cubeSetPull = cubeSet.trim().split(", ");

      return cubeSetPull.every((cube) => {
        const cubeSplit = cube.split(" ");

        const cubeCount = +cubeSplit.at(0)!;
        const cubeColor = cubeSplit.at(1);

        switch (cubeColor) {
          case "red":
            return cubeCount <= totalRed;
          case "green":
            return cubeCount <= totalGreen;
          case "blue":
            return cubeCount <= totalBlue;
        }
      });
    });

    return isValidGame ? +gameId! : 0;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Part 1: ", conundrumSumPt1);

const conundrumSumPt2 = inputFile
  .split("\n")
  .map((line) => {
    const conundrumPattern = /Game (\d*): (.*)/g;

    const gameMatch = conundrumPattern.exec(line);

    if (!gameMatch) return 0;

    const gameplayString = gameMatch.at(2);
    const cubeSets = gameplayString?.split(";") ?? [];

    let minRed = 0,
      minGreen = 0,
      minBlue = 0;

    cubeSets.forEach((cubeSet) => {
      const cubeSetPull = cubeSet.trim().split(", ");

      return cubeSetPull.forEach((cube) => {
        const cubeSplit = cube.split(" ");

        const cubeCount = +cubeSplit.at(0)!;
        const cubeColor = cubeSplit.at(1);

        switch (cubeColor) {
          case "red":
            minRed = Math.max(minRed, cubeCount);
            break;
          case "green":
            minGreen = Math.max(minGreen, cubeCount);
            break;
          case "blue":
            minBlue = Math.max(minBlue, cubeCount);
            break;
        }
      });
    });

    return minRed * minGreen * minBlue;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Part 2: ", conundrumSumPt2);
