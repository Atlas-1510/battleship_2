import React, { FC, useEffect, useState } from "react";
import { Board } from "../../interfaces/Board";
import { Coordinate } from "../../interfaces/Coordinate";
import { ShipPlacement } from "../../interfaces/ShipPlacement";
import { getShipLength } from "../../utilities/getShipLength";
import BoardTile from "../BoardTile";
import { BoardUI } from "./styles";

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

  useEffect(() => {
    if (hoverCoordinates) {
      const generateHighlightCoordinates = (): Coordinate[] => {
        if (!hoverCoordinates) {
          throw new Error(
            "generateHighlightCoordinates called without defined hover coordinates"
          );
        }
        const length = getShipLength(form.ship);
        const coords: Coordinate[] = [];
        if (form.direction === "horizontal") {
          const mouseX = hoverCoordinates.x;

          for (let i = mouseX; i < mouseX + length && i <= 9; i++) {
            coords.push({ x: i, y: hoverCoordinates.y });
          }
        } else {
          const mouseY = hoverCoordinates.y;

          for (let i = mouseY; i < mouseY + length && i <= 9; i++) {
            coords.push({ x: hoverCoordinates.x, y: i });
          }
        }
        return coords;
      };
      const coords = generateHighlightCoordinates();
      setHighlightedCoordinates(coords);
    }
  }, [hoverCoordinates, form]);

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
      const shouldHighlight: boolean = highlightedCoordinates.some(
        (coord) => coord.x === x && coord.y === y
      );
      grid.push(
        <BoardTile
          key={`${x},${y}`}
          occupied={occupiedCoordinate ? true : false}
          highlight={shouldHighlight}
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
    <BoardUI
      onMouseLeave={() => {
        setHoverCoordinates(null);
        setHighlightedCoordinates([]);
      }}
      data-testid="gameboard"
    >
      {grid.map((tile) => tile)}
    </BoardUI>
  );
};

export default GameBoard;
