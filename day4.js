const fs = require("node:fs");

const data = fs.readFileSync("./day4.txt", "utf8");

const letters = data.split("\n").map((line) => line.split(""));
const lettersR = letters[0].map((val, index) =>
  letters.map((row) => row[index]).reverse()
);

const p1 = () => {
  let count = 0;

  const findH = (l) =>
    l.forEach((line) => {
      count += line.join("").split("XMAS").length - 1;
      count += line.join("").split("SAMX").length - 1;
    });

  findH(letters);
  findH(lettersR);

  const findD = (l) => {
    for (let i = 0; i < l.length - 3; i++) {
      for (let j = 0; j < l[i].length - 3; j++) {
        const word =
          l[i][j] + l[i + 1][j + 1] + l[i + 2][j + 2] + l[i + 3][j + 3];
        if (word === "XMAS" || word === "SAMX") count++;
      }
    }
  };

  findD(letters);
  findD(lettersR);

  return count;
};

const p2 = () => {
  let count = 0;

  for (let i = 1; i < letters.length - 1; i++) {
    for (let j = 1; j < letters[i].length - 1; j++) {
      const d1 = letters[i - 1][j - 1] + letters[i][j] + letters[i + 1][j + 1];
      const d2 = letters[i + 1][j - 1] + letters[i][j] + letters[i - 1][j + 1];

      if ((d1 === "MAS" || d1 === "SAM") && (d2 === "MAS" || d2 === "SAM"))
        count++;
    }
  }

  return count;
};

console.log(p1());
console.log(p2());
