const fs = require("fs");

const simulateCucumbers = (inputMap) => {
  const getMovables = (map, type) => {
    let next;
    if (type == ">") {
      next = (row, col) => {
        return [row, col < map[0].length - 1 ? col + 1 : 0];
      };
    } else {
      next = (row, col) => {
        return [row < map.length - 1 ? row + 1 : 0, col];
      };
    }

    const movables = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell == type) {
          const [nr, nc] = next(rowIndex, colIndex);
          if (map[nr][nc] == ".") {
            movables.push([
              [rowIndex, colIndex],
              [nr, nc],
            ]);
          }
        }
      });
    });

    return movables;
  };

  const move = (map, movables) => {
    movables.forEach(([[fromRow, fromCol], [toRow, toCol]]) => {
      map[toRow][toCol] = map[fromRow][fromCol];
      map[fromRow][fromCol] = ".";
    });
  };

  const map = [...inputMap.map((l) => [...l])];
  let i = 1;

  while (true) {
    const movableEast = getMovables(map, ">");
    move(map, movableEast);

    const movableSouth = getMovables(map, "v");
    move(map, movableSouth);

    if (!movableEast.length && !movableSouth.length) {
      return i;
    }

    i++;
  }
};

const map = fs
  .readFileSync("./inputs/day25.txt", "utf8")
  .split("\n")
  .map((l) => l.split(""));

console.log(simulateCucumbers(map));
