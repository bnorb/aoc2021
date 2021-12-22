const fs = require("fs");

const simulate = (fishDelays, generations) => {
  const tick = (fishGroups) => {
    const newGroup = new Map();

    Array.from(fishGroups).forEach((fg) => {
      const [age, count] = fg;
      if (age == 0) {
        newGroup.set(8, count);
        newGroup.set(6, (newGroup.get(6) || 0) + count);
      } else {
        newGroup.set(age - 1, (newGroup.get(age - 1) || 0) + count);
      }
    });

    return newGroup;
  };

  let fishGroups = fishDelays.reduce((aggr, fish) => {
    const age = parseInt(fish, 10);
    aggr.set(age, aggr.get(age) + 1);

    return aggr;
  }, new Map(new Array(9).fill(0).map((v, i) => [i, v])));

  for (let i = 0; i < generations; i++) {
    fishGroups = tick(fishGroups);
  }

  return Array.from(fishGroups.values()).reduce((sum, count) => sum + count, 0);
};

const fishDelays = fs.readFileSync("./inputs/day6.txt", "utf8").split(",");

console.log(simulate(fishDelays, 80));
console.log(simulate(fishDelays, 256));
