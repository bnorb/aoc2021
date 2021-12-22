const fs = require("fs");

const getPosition = (directions) => {
  let depth = 0;
  let horizontal = 0;

  directions.forEach((d) => {
    let [dir, amount] = d.split(" ");
    amount = parseInt(amount, 10);

    switch (dir) {
      case "forward": {
        horizontal += amount;
        break;
      }
      case "up": {
        depth -= amount;
        break;
      }
      case "down": {
        depth += amount;
      }
    }
  });

  return [depth, horizontal];
};

const getPositionAimed = (directions) => {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  directions.forEach((d) => {
    let [dir, amount] = d.split(" ");
    amount = parseInt(amount, 10);

    switch (dir) {
      case "forward": {
        horizontal += amount;
        depth += aim * amount;
        break;
      }
      case "up": {
        aim -= amount;
        break;
      }
      case "down": {
        aim += amount;
      }
    }
  });

  return [depth, horizontal];
};

const directions = fs.readFileSync("./inputs/day2.txt", "utf8").split("\n");

let position = getPosition(directions);
console.log(position[0] * position[1]);

position = getPositionAimed(directions);
console.log(position[0] * position[1]);
