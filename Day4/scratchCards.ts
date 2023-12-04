import fs from "fs";

const inputFile = fs.readFileSync("Day4/scratchCards-input.txt", "utf8");

const scratchCardsSumP1 = inputFile
  .split("\n")
  .map((line) => {
    const scratchCardPattern = /(Card\s*(\d*):) (.*) \| (.*)/g;

    const scratchCardMatch = scratchCardPattern.exec(line);

    const winningNumbers = scratchCardMatch?.at(3)?.trim().split(/[\s]+/) ?? [];
    const scratchNumbers = scratchCardMatch?.at(4)?.trim().split(/[\s]+/) ?? [];

    const numberMatched = scratchNumbers.filter((num) =>
      winningNumbers.includes(num)
    ).length;

    return numberMatched > 0 ? 2 ** (numberMatched - 1) : 0;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Part 1: ", scratchCardsSumP1);

const scratchCards = inputFile.split("\n");

const scratchCardWins: number[] = new Array(scratchCards.length + 1).fill(1);
scratchCardWins[0] = 0;

scratchCards.forEach((line) => {
  const scratchCardPattern = /(Card\s*(\d*):) (.*) \| (.*)/g;

  const scratchCardMatch = scratchCardPattern.exec(line);

  const cardId = +scratchCardMatch!.at(2)!;
  const winningNumbers = scratchCardMatch!.at(3)?.trim().split(/[\s]+/) ?? [];
  const scratchNumbers = scratchCardMatch!.at(4)?.trim().split(/[\s]+/) ?? [];

  const numberMatched = scratchNumbers.filter((num) =>
    winningNumbers.includes(num)
  ).length;

  for (let i = 1; i <= numberMatched; i++) {
    scratchCardWins[cardId + i] += scratchCardWins[cardId];
  }
});

const scratchCardsSumP2 = scratchCardWins.reduce((acc, curr) => acc + curr, 0);
console.log("Part 2: ", scratchCardsSumP2);
