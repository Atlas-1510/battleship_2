import React, { FC } from "react";
import { Board } from "../../interfaces/Board";
import { BoardContainer, OccupiedTileContainer, TileContainer } from "./styles";

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

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      let occupiedCoordinate = occupiedCoordinates.filter(
        (coord) => coord.x === x && coord.y === y
      )[0];
      if (occupiedCoordinate) {
        grid.push(
          <OccupiedTileContainer
            key={`${x},${y}`}
            data-x={x}
            data-y={y}
            data-testid={`${x},${y}`}
            data-ship={occupiedCoordinate.ship}
          >
            {x},{y}
          </OccupiedTileContainer>
        );
      } else {
        grid.push(
          <TileContainer
            key={`${x},${y}`}
            data-x={x}
            data-y={y}
            data-testid={`${x},${y}`}
          >
            {x},{y}
          </TileContainer>
        );
      }
    }
  }

  return (
    <div data-testid="gameboard">
      <h1>Gameboard</h1>
      <BoardContainer>{grid.map((tile) => tile)}</BoardContainer>
    </div>
  );
};

export default GameBoard;
