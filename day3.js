const fs = require("node:fs");

const data = fs.readFileSync("./day3.txt", "utf8");

const multiply = (mul) => {
  const vals = mul.split(",").map((v) => Number(v.replace(/\D/g, "")));
  return vals[0] * vals[1];
};

const p1 = () => {
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const cleaned = data.match(regex);

  return cleaned.reduce((acc, curr) => {
    return (acc += multiply(curr));
  }, 0);
};

const p2 = () => {
  const getMatchIndices = (text, regex) => {
    const indices = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      indices.push([match.index, match[0]]);
    }
    return indices;
  };

  const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;

  const mul = getMatchIndices(data, mulRegex);
  const dos = getMatchIndices(data, doRegex);
  const donts = getMatchIndices(data, dontRegex);

  const ops = [...mul, ...dos, ...donts].sort((a, b) => a[0] - b[0]);

  let enabled = true;
  return ops.reduce((acc, curr) => {
    if (curr[1] === "don't()") {
      enabled = false;
      return acc;
    } else if (curr[1] === "do()") {
      enabled = true;
      return acc;
    }
    if (!enabled) return acc;
    return (acc += multiply(curr[1]));
  }, 0);
};

console.log(p1());
console.log(p2());
