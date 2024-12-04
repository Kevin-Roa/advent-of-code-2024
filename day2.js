const fs = require("node:fs");

const data = fs.readFileSync("./day2.txt", "utf8");

const levels = data.split("\n").map((l) => l.split(" ").map((l) => Number(l)));

const isSafe = (level) => {
  let diff = NaN;
  let isSafe = true;
  for (let i = 0; i < level.length - 1; i++) {
    let d = level[i] - level[i + 1];
    if (
      d === 0 ||
      Math.abs(d) > 3 ||
      (!isNaN(diff) && Math.sign(diff) !== Math.sign(d))
    ) {
      isSafe = false;
      break;
    }
    diff = d;
  }
  return isSafe;
};

const p1 = () => {
  let safeCount = 0;
  levels.forEach((level) => {
    if (isSafe(level)) safeCount++;
  });
  return safeCount;
};

const p2 = () => {
  let safeCount = 0;

  levels.forEach((level) => {
    const permutations = [level, ...level.map((_, i, l) => l.toSpliced(i, 1))];
    if (permutations.some((p) => isSafe(p))) return safeCount++;
  });

  return safeCount;
};

console.log(p1());
console.log(p2());
