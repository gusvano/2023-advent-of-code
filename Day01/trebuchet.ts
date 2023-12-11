import fs from "fs";

const inputFile = fs.readFileSync("Day01/trebuchet-input.txt", "utf8");

const calibrationSum: number = inputFile
  .split("\n")
  .map((line) => {
    const numPattern = /\d+/g;

    const lineNums = line.match(numPattern)?.join("");
    return Number(`${lineNums?.at(0)}${lineNums?.at(lineNums.length - 1)}`);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Part 1: ", calibrationSum);

const calibrationSumP2: number = inputFile
  .split("\n")
  .map((line) => {
    const numPattern = /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g;

    const lineNums = Array.from(line.matchAll(numPattern), (x) => x[1]);
    return +(lineNums
      ? `${ConvertToNumber(lineNums.at(0))}${ConvertToNumber(
          lineNums.at(lineNums.length - 1)
        )}`
      : "0");
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log("Part 2: ", calibrationSumP2);

function ConvertToNumber(input: string | undefined): number {
  if (!isNaN(+input!)) return +input!;

  switch (input) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return 0;
  }
}
