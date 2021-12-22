const fs = require("fs");

const getNeighbors = (row, col, image, voidCell) => {
  const neighbors = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  return neighbors.map(([row, col]) => {
    if (row < 0 || col < 0 || row >= image.length || col >= image[0].length) {
      return voidCell;
    }

    return image[row][col];
  });
};

const enhance = (image, instructions, voidCell) => {
  let outputImage = [];
  for (let row = -1; row <= image.length; row++) {
    const line = [];
    for (let col = -1; col <= image[0].length; col++) {
      const index = parseInt(
        getNeighbors(row, col, image, voidCell).join(""),
        2
      );
      line.push(instructions[index]);
    }
    outputImage.push(line);
  }

  return [instructions[voidCell == 0 ? 0 : 9], outputImage];
};

const display = (image) => {
  return image.map((line) =>
    line.map((char) => (char == 1 ? "#" : ".")).join("")
  );
};

const enhanceNTimes = (n) => {
  let voidCell = 0;
  let enhancedImage = image;

  for (let i = 0; i < n; i++) {
    [voidCell, enhancedImage] = enhance(enhancedImage, instructions, voidCell);
  }

  return enhancedImage;
};

let [instructions, image] = fs
  .readFileSync("./inputs/day20.txt", "utf8")
  .split("\n\n");

instructions = instructions.split("").map((char) => (char == "." ? 0 : 1));

image = image
  .split("\n")
  .map((line) => line.split("").map((char) => (char == "." ? 0 : 1)));

console.log(
  enhanceNTimes(2)
    .flatMap((c) => c)
    .filter((c) => c == 1).length
);
console.log(
  enhanceNTimes(50)
    .flatMap((c) => c)
    .filter((c) => c == 1).length
);
