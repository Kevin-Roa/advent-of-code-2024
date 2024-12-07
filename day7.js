const { log } = require("node:console");
const fs = require("node:fs");

const data = fs.readFileSync("./day7.txt", "utf8");

const equations = data.split("\n").map((line) => {
  const a = line.split(": ");
  return {
    result: Number(a[0]),
    values: a[1].split(" ").map((i) => Number(i)),
  };
});

const getPermutations = (n, operators) => {
  if (n === 0) return [[]];
  return getPermutations(n - 1, operators).flatMap((comb) =>
    operators.map((o) => [o].concat(comb))
  );
};

const testPermutation = (values, ops, result) => {
  return ops.some((op) => {
    let res = values[0];
    for (let i = 0; i < op.length; i++) {
      if (op[i] === "+") res += values[i + 1];
      else if (op[i] === "*") res *= values[i + 1];
      else if (op[i] === "||")
        res = Number(String(res) + String(values[i + 1]));
    }

    return res === result;
  });
};

const p1 = () => {
  const valid = [];

  equations.forEach(({ result, values }) => {
    const ops = getPermutations(values.length - 1, ["+", "*"]);
    if (testPermutation(values, ops, result)) valid.push(result);
  });

  return valid.reduce((a, b) => a + b, 0);
};

const p2 = () => {
  const valid = [];

  equations.forEach(({ result, values }) => {
    const ops = getPermutations(values.length - 1, ["+", "*", "||"]);
    if (testPermutation(values, ops, result)) valid.push(result);
  });

  return valid.reduce((a, b) => a + b, 0);
};

console.log(p1());
console.log(p2());
