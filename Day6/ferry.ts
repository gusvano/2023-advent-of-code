import fs from "fs";

const inputFile = fs.readFileSync("Day6/ferry-input.txt", "utf8");

const raceDetails = inputFile.split("\n");

const ferryP1 = () => {
  const raceTime =
    raceDetails[0]
      .split(": ")[1]
      .match(/\d+/g)
      ?.map((n) => +n) ?? [];
  const raceDistance =
    raceDetails[1]
      .split(": ")[1]
      .match(/\d+/g)
      ?.map((n) => +n) ?? [];

  let totalWinCombinations = 1;

  for (let i = 0; i < raceTime.length; i++) {
    const time = raceTime[i];
    const distance = raceDistance[i];
    let validWins: number = 0;

    for (let j = 1; j <= time; j++) {
      const distanceTravelled = (time - j) * j;

      if (distanceTravelled > distance) {
        validWins += 1;
      }
    }

    totalWinCombinations *= validWins;
  }

  return totalWinCombinations;
};

console.log("Part 1: ", ferryP1());

const ferryP2 = () => {
  const raceTime = +(
    raceDetails[0]
      .split(": ")[1]
      .match(/\d+/g)
      ?.reduce((acc, curr) => acc + curr, "") ?? ""
  );
  const raceDistance = +(
    raceDetails[1]
      .split(": ")[1]
      .match(/\d+/g)
      ?.reduce((acc, curr) => acc + curr, "") ?? ""
  );

  let validWins: number = 0;

  for (let j = 1; j <= raceTime; j++) {
    const distanceTravelled = (raceTime - j) * j;

    if (distanceTravelled > raceDistance) {
      validWins += 1;
    }
  }

  return validWins;
};

console.log("Part 2: ", ferryP2());
