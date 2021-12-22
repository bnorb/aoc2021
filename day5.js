const fs = require("fs");

const countOverlaps = (lines) => {
  const points = new Map();

  lines.forEach((line) => {
    const [start, end] = line.split(" -> ");
    let [startX, startY] = start.split(",");
    let [endX, endY] = end.split(",");
    startX = parseInt(startX, 10);
    startY = parseInt(startY, 10);
    endX = parseInt(endX, 10);
    endY = parseInt(endY, 10);

    let i = startX;
    let j = startY;

    while (true) {
      points.set(`${i}_${j}`, (points.get(`${i}_${j}`) || 0) + 1);

      if (startX != endX) {
        if (startX > endX) {
          i--;
          if (i < endX) break;
        } else {
          i++;
          if (i > endX) break;
        }
      }

      if (startY != endY) {
        if (startY > endY) {
          j--;
          if (j < endY) break;
        } else {
          j++;
          if (j > endY) break;
        }
      }
    }
  });

  return [...points].filter((entry) => entry[1] > 1).length;
};

const lines = fs.readFileSync("./inputs/day5.txt", "utf8").split("\n");

console.log(
  countOverlaps(
    lines.filter((line) => {
      const [start, end] = line.split(" -> ");
      const [startX, startY] = start.split(",");
      const [endX, endY] = end.split(",");

      return startX == endX || startY == endY;
    })
  )
);
console.log(countOverlaps(lines));
