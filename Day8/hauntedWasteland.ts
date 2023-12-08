import fs from "fs";

const inputFile = fs.readFileSync("Day8/hauntedWasteland-input.txt", "utf8");

type MapNode = {
  left: string;
  right: string;
};

type Map = Record<string, MapNode>;

function parseInput(): [string, Map] {
  const lines = inputFile.split("\n");
  const instructions = lines.shift()!;
  lines.shift();

  const map: Map = {};
  lines.forEach((line) => {
    const [node, leftRight] = line.split(" = ");
    const [left, right] = leftRight.split(", ");
    map[node] = { left: left.replace("(", ""), right: right.replace(")", "") };
  });

  return [instructions, map];
}

const hauntedWastelandP1 = () => {
  const [instructions, map] = parseInput();

  let currentLocation = "AAA";
  let steps = 0;

  while (currentLocation !== "ZZZ") {
    const currentMapNode = map[currentLocation];
    const nextInstruction = instructions[steps % instructions.length];
    currentLocation =
      nextInstruction === "L" ? currentMapNode.left : currentMapNode.right;
    steps++;
  }

  return steps;
};

console.log("Part 1: ", hauntedWastelandP1());

function GetNodeSteps(node: string, instructions: string, map: Map): number {
  let steps = 0;
  let currentLocation = node;

  while (!currentLocation.endsWith("Z")) {
    const currentMapNode = map[currentLocation];
    const nextInstruction = instructions[steps % instructions.length];
    currentLocation =
      nextInstruction === "L" ? currentMapNode.left : currentMapNode.right;
    steps++;
  }

  return steps;
}

function LeastCommonMultiple(a: number, b: number): number {
  return (a * b) / GreatestCommonDivisor(a, b);
}

function GreatestCommonDivisor(a: number, b: number): number {
  if (b === 0) {
    return a;
  }

  return GreatestCommonDivisor(b, a % b);
}

const hauntedWastelandP2 = () => {
  const [instructions, map] = parseInput();

  let nodeSteps = Object.keys(map)
    .filter((node) => node.endsWith("A"))
    .map((node) => GetNodeSteps(node, instructions, map));

  let lowestCommonMultiple = nodeSteps[0];

  for (let i = 1; i < nodeSteps.length; i++) {
    lowestCommonMultiple = LeastCommonMultiple(
      lowestCommonMultiple,
      nodeSteps[i]
    );
  }

  return lowestCommonMultiple;
};

console.log("Part 2: ", hauntedWastelandP2());
