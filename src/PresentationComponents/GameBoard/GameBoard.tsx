import React, { FC } from "react";
import { Board } from "../../interfaces/Board";

interface Props {
  board: Board;
}

const GameBoard: FC<Props> = ({ board }) => {
  const grid: JSX.Element[] = [];

  const occupiedCoordinates = board.ships
    .map((ship) =>
      ship.location.map((coord) => ({
        x: coord.x,
        y: coord.y,
        ship: ship.type,
      }))
    )
    .flat();

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      let occupiedCoordinate = occupiedCoordinates.filter(
        (coord) => coord.x === x && coord.y === y
      )[0];

      grid.push(
        <div
          key={`${x},${y}`}
          data-x={x}
          data-y={y}
          data-testid={`${x},${y}`}
          data-ship={occupiedCoordinate ? occupiedCoordinate.ship : ""}
        >
          {x},{y}
        </div>
      );
    }
  }

  return (
    <>
      <h1>Gameboard</h1>
      <div>{grid.map((tile) => tile)}</div>
    </>
  );
};

export default GameBoard;
