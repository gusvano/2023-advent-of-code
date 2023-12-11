import fs from "fs";

const inputFile = fs.readFileSync("Day07/camelCards-input.txt", "utf8");

enum Strength {
  FiveOfAKind = 6,
  FourOfAKind = 5,
  FullHouse = 4,
  ThreeOfAKind = 3,
  TwoPairs = 2,
  OnePair = 1,
  HighCard = 0,
}

type Hand = {
  strength: Strength;
  cards: string;
  bid: number;
};

function countCharacter(string: string, character: string): number {
  return string.split(character).length - 1;
}

function GetHandStrength(cards: string, isJWild: boolean = false): Strength {
  let strength: Strength = Strength.HighCard;
  const individualCards = new Set(cards.split(""));
  const characterCountMax = Math.max(
    ...[...individualCards].map((card) => countCharacter(cards, card))
  );

  switch (individualCards.size) {
    case 1:
      strength = Strength.FiveOfAKind;
      break;
    case 2:
      if (!isJWild || !cards.includes("J")) {
        strength =
          characterCountMax === 4 ? Strength.FourOfAKind : Strength.FullHouse;
      } else {
        strength = Strength.FiveOfAKind;
      }
      break;
    case 3:
      strength =
        characterCountMax === 3 ? Strength.ThreeOfAKind : Strength.TwoPairs;

      if (!isJWild || !cards.includes("J")) {
        break;
      } else {
        const jCount = countCharacter(cards, "J");
        strength =
          strength === Strength.ThreeOfAKind
            ? Strength.FourOfAKind
            : jCount === 2
            ? Strength.FourOfAKind
            : Strength.FullHouse;
      }
      break;
    case 4:
      if (!isJWild || !cards.includes("J")) {
        strength = Strength.OnePair;
      } else {
        strength = Strength.ThreeOfAKind;
      }
      break;
    default:
      if (!isJWild || !cards.includes("J")) {
        strength = Strength.HighCard;
      } else {
        strength = Strength.OnePair;
      }
      break;
  }

  return strength;
}

function GetCardStrength(card: string, isJWild: boolean = false): number {
  switch (card) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return isJWild ? 1 : 11;
    case "T":
      return 10;
    default:
      return +card;
  }
}

function CompareHands(hand1: Hand, hand2: Hand, isJWild: boolean = false) {
  if (hand1.strength > hand2.strength) {
    return 1;
  } else if (hand1.strength < hand2.strength) {
    return -1;
  } else {
    const hand1Cards = hand1.cards;
    const hand2Cards = hand2.cards;

    for (let i = 0; i < hand1Cards.length; i++) {
      const hand1Strength = GetCardStrength(hand1Cards[i], isJWild);
      const hand2Strength = GetCardStrength(hand2Cards[i], isJWild);
      if (hand1Strength > hand2Strength) {
        return 1;
      } else if (hand1Strength < hand2Strength) {
        return -1;
      }
    }
  }

  return 0;
}

const camelCardsP1 = inputFile
  .split("\n")
  .map((line) => {
    const [cards, bid] = line.split(" ");

    return { cards, bid: +bid, strength: GetHandStrength(cards) };
  })
  .sort(CompareHands)
  .reduce((acc, curr, index) => acc + curr.bid * (index + 1), 0);

console.log("Part 1: ", camelCardsP1);

const camelCardsP2 = inputFile
  .split("\n")
  .map((line) => {
    const [cards, bid] = line.split(" ");

    return { cards, bid: +bid, strength: GetHandStrength(cards, true) };
  })
  .sort((hand1, hand2) => CompareHands(hand1, hand2, true))
  .reduce((acc, curr, index) => acc + curr.bid * (index + 1), 0);

console.log("Part 2: ", camelCardsP2);
