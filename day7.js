const fs = require("fs");

const alignCrabs = (crabs, calcFuel) => {
  const [min, max] = crabs.reduce(
    (minMax, d) => [
      minMax[0] > d ? d : minMax[0],
      minMax[1] < d ? d : minMax[1],
    ],
    [Number.MAX_SAFE_INTEGER, 0]
  );

  let minFuel = Number.MAX_SAFE_INTEGER;
  for (let i = min; i <= max; i++) {
    const fuel = crabs.reduce((fuel, pos) => {
      fuel += calcFuel(pos, i);
      return fuel;
    }, 0);

    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
};

const crabs = fs
  .readFileSync("./inputs/day7.txt", "utf8")
  .split(",")
  .map((d) => parseInt(d, 10));

console.log(alignCrabs(crabs, (pos, i) => Math.abs(pos - i)));
console.log(
  alignCrabs(crabs, (pos, i) => {
    const n = Math.abs(pos - i);
    return (n * (n + 1)) / 2;
  })
);
