const fs = require("node:fs");

const data = fs.readFileSync("./day10.txt", "utf8");

const map = data.split("\n").map((i) =>
  i
    .split("")
    .filter((i) => i !== "\r")
    .map(Number)
);

const heads = map.flatMap((row, rowIndex) =>
  row
    .map((value, colIndex) => (value === 0 ? [rowIndex, colIndex] : null))
    .filter(Boolean)
);

const search = (start, track) => {
  const checked = new Set();

  const _search = (r, c, last) => {
    const curr = map[r]?.[c];

    if (curr === undefined) return 0;
    if (curr !== last + 1) return 0;
    if (curr === 9) {
      if (track) {
        if (checked.has(r + "," + c)) return 0;
        checked.add(r + "," + c);
      }
      return 1;
    }

    let sum = 0;
    sum += _search(r + 1, c, curr);
    sum += _search(r - 1, c, curr);
    sum += _search(r, c + 1, curr);
    sum += _search(r, c - 1, curr);
    return sum;
  };

  return _search(...start, -1);
};

const p1 = () => {
  return heads.reduce((sum, head) => sum + search(head, true), 0);
};

const p2 = () => {
  return heads.reduce((sum, head) => sum + search(head, false), 0);
};

console.log(p1());
console.log(p2());
