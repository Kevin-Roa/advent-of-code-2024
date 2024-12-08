const fs = require("node:fs");
const _ = require("lodash");

const data = fs.readFileSync("./day8.txt", "utf8");

const city = data.split("\n").map((r) => r.split("").filter((i) => i !== "\r"));

const getAntennas = () => {
  const antennas = {};
  for (let i = 0; i < city.length; i++) {
    for (let j = 0; j < city[0].length; j++) {
      const loc = city[i][j];
      if (loc === ".") continue;
      if (!antennas[loc]) antennas[loc] = [];
      antennas[loc].push([i, j]);
    }
  }
  return antennas;
};

const iterateAntennas = (antennas, callback) => {
  Object.values(antennas).forEach((freq) => {
    freq.forEach((antenna1) => {
      freq.forEach((antenna2) => {
        callback(antenna1, antenna2);
      });
    });
  });
};

const inBounds = (r, c) => {
  if (r < 0 || r > city.length - 1) return false;
  if (c < 0 || c > city[0].length - 1) return false;
  return true;
};

const getAntinodeCount = (city) => {
  return city.reduce((total, row) => {
    return (
      total +
      row.reduce((rowCount, element) => {
        return rowCount + (element === "#" ? 1 : 0);
      }, 0)
    );
  }, 0);
};

const p1 = () => {
  const antennas = getAntennas();
  const antinodes = _.cloneDeep(city);

  iterateAntennas(antennas, (antenna1, antenna2) => {
    if (_.isEqual(antenna1, antenna2)) return;

    const rDiff = antenna2[0] - antenna1[0];
    const cDiff = antenna2[1] - antenna1[1];
    const rNext = antenna2[0] + rDiff;
    const cNext = antenna2[1] + cDiff;

    if (!inBounds(rNext, cNext)) return;

    antinodes[rNext][cNext] = "#";
  });

  return getAntinodeCount(antinodes);
};

const p2 = () => {
  const antennas = getAntennas();
  const antinodes = _.cloneDeep(city);

  iterateAntennas(antennas, (antenna1, antenna2) => {
    const rDiff = antenna2[0] - antenna1[0];
    const cDiff = antenna2[1] - antenna1[1];
    let rNext = antenna2[0] + rDiff;
    let cNext = antenna2[1] + cDiff;

    while (true) {
      if (!inBounds(rNext, cNext)) break;

      antinodes[rNext][cNext] = "#";

      rNext = rNext + rDiff;
      cNext = cNext + cDiff;

      if (rDiff === 0 && cDiff === 0) break;
    }
  });

  return getAntinodeCount(antinodes);
};

console.log(p1());
console.log(p2());
