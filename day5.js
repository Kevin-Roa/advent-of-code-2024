const fs = require("node:fs");

const dataOrdering = fs.readFileSync("./day5ordering.txt", "utf8");
const dataUpdate = fs.readFileSync("./day5update.txt", "utf8");

const orders = dataOrdering
  .split("\n")
  .map((i) => ({ x: Number(i.split("|")[0]), y: Number(i.split("|")[1]) }));

const updates = dataUpdate
  .split("\n")
  .map((i) => i.split(",").map((i) => Number(i)));

// {Y: [X,X,X]} Y must have all these X to be valid
const reqs = orders.reduce((acc, curr) => {
  if (!acc[curr.y]) acc[curr.y] = [];
  acc[curr.y].push(curr.x);

  return acc;
}, {});

const correctOrders = [];
const incorrectOrders = [];

const checkValid = (update) => {
  let valid = true;
  for (let i = 0; i < update.length; i++) {
    const curr = update[i];
    const req = reqs[curr]?.filter?.((r) => update.includes(r));

    if (i === 0 && req?.length > 0) {
      valid = false;
      break;
    }

    const before = update.slice(orders, i);

    if (!req) continue;
    if (req.every((page) => before.includes(page))) continue;
    valid = false;
    break;
  }
  return valid;
};

const p1 = () => {
  updates.forEach((update) => {
    if (checkValid(update)) correctOrders.push(update);
    else incorrectOrders.push(update);
  });

  return correctOrders.reduce((acc, curr) => {
    return (acc += curr[Math.floor(curr.length / 2)]);
  }, 0);
};

const p2 = () => {
  const corrected = [];

  incorrectOrders.forEach((order) => {
    const c = [...order];

    while (!checkValid(c)) {
      orders.forEach((o) => {
        const ix = c.indexOf(o.x);
        const iy = c.indexOf(o.y);

        if (ix === -1 || iy === -1 || ix < iy) return;

        // Swap elements
        [c[ix], c[iy]] = [c[iy], c[ix]];
      });
    }

    corrected.push(c);
  });

  return corrected.reduce((acc, curr) => {
    return (acc += curr[Math.floor(curr.length / 2)]);
  }, 0);
};

console.log(p1());
console.log(p2());
