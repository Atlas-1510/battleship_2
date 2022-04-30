import React, { FC, useEffect, useState } from "react";
import { Board } from "../../interfaces/Board";
import { Coordinate } from "../../interfaces/Coordinate";
import { ShipPlacement } from "../../interfaces/ShipPlacement";
import BoardTile from "../BoardTile";
import { BoardContainer } from "./styles";

interface Props {
  board: Board;
  form: ShipPlacement;
  confirmShipPlacement: (shipPlacement: ShipPlacement) => void;
}

const GameBoard: FC<Props> = ({ board, form, confirmShipPlacement }) => {
  const [hoverCoordinates, setHoverCoordinates] = useState<Coordinate | null>(
    null
  );
  const [highlightedCoordinates, setHighlightedCoordinates] = useState<
    Coordinate[]
  >([]);

  // get coordinates of tile being hovered
  // generate highlight coordinates based on hover coordinates, ship length, and ship direction
  // set highlighted coordinates
  // render tiles, if tile coords are within highlighted array then render a highlight tile

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
      grid.push(
        <BoardTile
          key={`${x},${y}`}
          occupied={occupiedCoordinate ? true : false}
          highlight={
            hoverCoordinates
              ? hoverCoordinates.x === x && hoverCoordinates.y === y
              : false
          }
          x={x}
          y={y}
          dataShip={occupiedCoordinate ? occupiedCoordinate.ship : ""}
          onClick={() =>
            confirmShipPlacement({
              ship: form.ship,
              x,
              y,
              direction: form.direction,
            })
          }
          onMouseOver={() => {
            setHoverCoordinates({ x, y });
          }}
        />
      );
    }
  }

  return (
    <BoardContainer
      onMouseLeave={() => setHoverCoordinates(null)}
      data-testid="gameboard"
    >
      {grid.map((tile) => tile)}
    </BoardContainer>
  );
};

export default GameBoard;
