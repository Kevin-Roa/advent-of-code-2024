const fs = require("node:fs");

const data = fs.readFileSync("./day1.txt", "utf8");

const a = [];
const b = [];
data.split("\n").forEach((i) => {
  const s = i.split("   ");
  a.push(Number(s[0]));
  b.push(Number(s[1]));
});
a.sort();
b.sort();

const p1 = () => {
  let distance = 0;

  for (let i = 0; i < a.length; i++) {
    distance += Math.abs(a[i] - b[i]);
  }

  return distance;
};

const p2 = () => {
  const bCount = b.reduce((acc, curr) => {
    if (!acc[curr]) acc[curr] = 0;
    acc[curr] += 1;
    return acc;
  }, {});

  return a.reduce((acc, curr) => {
    acc += curr * (bCount[curr] ?? 0);
    return acc;
  }, 0);
};

console.log(p1());
console.log(p2());
