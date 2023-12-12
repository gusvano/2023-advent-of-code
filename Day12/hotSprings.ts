import fs from "fs";

const inputFile = fs.readFileSync("Day12/hotSprings-input.txt", "utf8");
const lines = inputFile.split("\n");

// Thanks to https://gist.github.com/Nathan-Fenner/781285b77244f06cf3248a04869e7161
function memoize<Args extends unknown[], Result>(
  func: (...args: Args) => Result
): (...args: Args) => Result {
  const stored = new Map<string, Result>();

  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k)!;
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
}

const count = memoize((line: string, groups: readonly number[]): number => {
  if (line.length === 0) {
    if (groups.length === 0) {
      return 1;
    }

    return 0;
  }

  if (groups.length === 0) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "#") {
        return 0;
      }
    }

    return 1;
  }

  const groupSum = groups.reduce((a, b) => a + b, 0);
  if (line.length < groupSum + groups.length - 1) {
    return 0;
  }

  if (line[0] === ".") {
    return count(line.slice(1), groups);
  }

  if (line[0] === "#") {
    const [group, ...leftoverGroups] = groups;

    for (let i = 0; i < group; i++) {
      if (line[i] === ".") {
        return 0;
      }
    }

    if (line[group] === "#") {
      return 0;
    }

    return count(line.slice(group + 1), leftoverGroups);
  }

  return (
    count("#" + line.slice(1), groups) + count("." + line.slice(1), groups)
  );
});

const hotSpringsP1 = lines
  .map((line) => {
    const [str, numString] = line.split(" ");
    const nums = numString.split(",").map(Number);

    return count(str, nums);
  })
  .reduce((a, b) => a + b, 0);

console.log("Part 1: ", hotSpringsP1);

const hotSpringsP2 = lines
  .map((line) => {
    const [str, numString] = line.split(" ");
    const nums = numString.split(",").map(Number);

    const expandedStr = [str, str, str, str, str].join("?");
    const expandedNums = [...nums, ...nums, ...nums, ...nums, ...nums];

    return count(expandedStr, expandedNums);
  })
  .reduce((a, b) => a + b, 0);

console.log("Part 2: ", hotSpringsP2);
