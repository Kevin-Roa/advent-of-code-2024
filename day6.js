const fs = require("node:fs");

const data = fs.readFileSync("./day6.txt", "utf8");

const map = data.split("\n").map((line) => line.split(""));

const directions = {
  up: { r: -1, c: 0, d: "up" },
  right: { r: 0, c: 1, d: "right" },
  down: { r: 1, c: 0, d: "down" },
  left: { r: 0, c: -1, d: "left" },
};
const nextDirection = {
  up: directions.right,
  right: directions.down,
  down: directions.left,
  left: directions.up,
};

const inBounds = (r, c) => {
  return r >= 0 && r < map.length && c >= 0 && c < map[0].length;
};

const p1 = () => {
  const visited = new Set();

  let guardR = map.findIndex((i) => i.includes("^"));
  let guardC = map[guardR].indexOf("^");
  let direction = directions.up;
  let nextR = guardR + direction.r;
  let nextC = guardC + direction.c;

  try {
    while (inBounds(nextR, nextC)) {
      visited.add(guardR + "," + guardC);

      const next = map[nextR][nextC];

      if (next === "#") {
        direction = nextDirection[direction.d];
      } else {
        guardR = nextR;
        guardC = nextC;
      }

      nextR = guardR + direction.r;
      nextC = guardC + direction.c;
    }
  } catch {}

  return visited.size;
};

// Brute force this shit because I am too lazy to think of something better
const p2 = () => {
  let loops = 0;

  map.forEach((row, r) => {
    row.forEach((col, c) => {
      const m = JSON.parse(JSON.stringify(map));

      let guardR = m.findIndex((i) => i.includes("^"));
      let guardC = m[guardR].indexOf("^");
      if (r === guardR && c === guardC) return;

      const visited = new Set();
      const visited2 = new Set();

      let direction = directions.up;
      let nextR = guardR + direction.r;
      let nextC = guardC + direction.c;

      m[r][c] = "#";

      try {
        while (inBounds(nextR, nextC)) {
          const v = JSON.stringify([guardR, guardC, direction]);
          if (visited2.has(v)) {
            loops++;
            break;
          }
          visited2.add(v);

          visited.add(guardR + "," + guardC);

          const next = m[nextR][nextC];

          if (next === "#") {
            direction = nextDirection[direction.d];
          } else {
            guardR = nextR;
            guardC = nextC;
          }

          nextR = guardR + direction.r;
          nextC = guardC + direction.c;
        }
      } catch {}
    });
  });

  return loops;
};

console.log(p1());
console.log(p2());
