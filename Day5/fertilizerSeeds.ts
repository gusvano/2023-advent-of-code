import fs from "fs";

const inputFile = fs.readFileSync("Day5/fertilizerSeeds-input.txt", "utf8");

type SourceRange = {
  source: number;
  range: number;
};

type MappingRule = {
  destination: number;
} & SourceRange;

type Map = {
  name: string;
  rules: MappingRule[];
};

function GetDestination(source: number, rules: MappingRule[]): number {
  const destinationRule = rules.find(
    (rule) => source >= rule.source && source <= rule.source + rule.range
  );

  return destinationRule
    ? destinationRule.destination + (source - destinationRule.source)
    : source;
}

function ProcessMaps(maps: string[]): Map[] {
  return maps.map((map) => {
    const lines = map.split("\n");
    const name = lines[0].split(" ")[0];
    lines.shift();

    const rules: MappingRule[] = lines.map((line) => {
      const rule = line.split(" ");

      return { destination: +rule[0], source: +rule[1], range: +rule[2] };
    });

    return { name, rules };
  });
}

const fertilizerSeedsP1 = () => {
  const lines = inputFile.split("\n");
  const seeds: number[] = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((s) => +s);

  const mapsToProcess = inputFile.split("\n\n");
  mapsToProcess.shift();

  const maps = ProcessMaps(mapsToProcess!);

  let minLocation;

  for (let i = 0; i < seeds.length; i++) {
    let nextSource = seeds[i];

    for (let j = 0; j < maps.length; j++) {
      nextSource = GetDestination(nextSource, maps[j].rules);
    }

    if (!minLocation || nextSource < minLocation) {
      minLocation = nextSource;
    }
  }

  return minLocation ?? -1;
};

console.log("Part 1: ", fertilizerSeedsP1());

function GetDestinationRanges(
  sourceRanges: SourceRange[],
  rules: MappingRule[]
): SourceRange[] {
  const destinationRanges: SourceRange[] = [];

  sourceRanges.forEach((sourceRange) => {
    let nextRange = sourceRange.range;
    let nextSource = sourceRange.source;

    while (
      nextRange > 0 &&
      nextSource <= sourceRange.source + sourceRange.range
    ) {
      const destinationRule = rules.find(
        (rule) =>
          nextSource >= rule.source && nextSource <= rule.source + rule.range
      );

      if (!destinationRule) {
        destinationRanges.push({ source: nextSource, range: nextRange });
        nextSource += nextRange;
        nextRange = 0;

        continue;
      }

      const range =
        nextRange > destinationRule.range ? destinationRule.range : nextRange;

      destinationRanges.push({ source: destinationRule.destination, range });

      nextSource += range;
      nextRange -= range;
    }
  });

  return destinationRanges;
}

const fertilizerSeedsP2 = () => {
  const lines = inputFile.split("\n");
  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((s) => +s);

  const mapsToProcess = inputFile.split("\n\n");
  mapsToProcess.shift();

  const maps = ProcessMaps(mapsToProcess!);

  let minLocation;

  for (let i = 0; i < seeds.length - 1; i += 2) {
    let startingSeed = seeds[i];
    let range = seeds[i + 1];

    let sourceRanges: SourceRange[] = [{ source: startingSeed, range }];

    for (let j = 0; j < maps.length; j++) {
      sourceRanges = GetDestinationRanges(sourceRanges, maps[j].rules);
    }

    minLocation = sourceRanges.reduce(
      (acc, curr) => (curr.source < acc.source ? curr : acc),
      minLocation ?? sourceRanges[0]
    );
  }

  return minLocation?.source ?? -1;
};

console.log("Part 2: ", fertilizerSeedsP2());
