const fs = require("node:fs");

const data = fs.readFileSync("./day9.txt", "utf8");
// const data = `2333133121414131402`;
const diskMap = data
  .split("")
  .filter((i) => i !== "\r")
  .map((i) => Number(i));

const decompress = (diskMap) => {
  const ret = [];
  let counter = 0;

  diskMap.forEach((len, i) => {
    const isBlock = i % 2 === 0;
    for (let j = 0; j < len; j++) {
      ret.push(isBlock ? counter : ".");
    }
    if (isBlock) counter++;
  });

  return ret;
};

const fragment = (disk) => {
  const ret = [...disk];

  for (let i = ret.length - 1; i > 0; i--) {
    const item = ret[i];
    if (item === ".") continue;

    const nextIdx = ret.indexOf(".");
    if (!nextIdx || nextIdx >= i) break;

    ret[nextIdx] = item;
    ret[i] = ".";
  }

  return ret;
};

const getSpaces = (disk) => {
  let flag = false;
  let space = 0;

  return disk.reduce((acc, curr, i) => {
    if (curr !== ".") {
      if (flag) space++;
      flag = false;
      return acc;
    }

    if (!acc[space]) acc[space] = [];
    acc[space].push(i);

    flag = true;
    return acc;
  }, {});
};

// This is REALLY bad but it works lol
// TODO improve this
const moveFiles = (disk) => {
  const ret = [...disk];

  for (let i = ret.length - 1; i > 0; i--) {
    const item = ret[i];
    if (item === ".") continue;

    const itemStart = ret.indexOf(item);
    const itemEnd = ret.findLastIndex((i) => i === item);
    const itemLength = itemEnd - itemStart + 1;

    const spaces = getSpaces(ret);
    const fit = Object.values(spaces).find(
      (s) => s.length >= itemLength && s[0] < itemStart
    );

    if (!fit) continue;

    for (let j = 0; j < itemLength; j++) {
      ret[fit[j]] = item;
      ret[itemStart + j] = ".";
    }

    i = itemStart;
  }

  return ret;
};

const calcChecksum = (fragmented) => {
  return fragmented.reduce((sum, curr, i) => {
    if (curr === ".") return sum;
    return sum + curr * i;
  }, 0);
};

const p1 = () => {
  const disk = decompress(diskMap);
  const fragmented = fragment(disk);
  return calcChecksum(fragmented);
};

const p2 = () => {
  const disk = decompress(diskMap);
  const moved = moveFiles(disk);
  return calcChecksum(moved);
};

console.log(p1());
console.log(p2());
