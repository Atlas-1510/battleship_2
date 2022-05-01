import React, { FC, useEffect, useState } from "react";
import { Board } from "../../interfaces/Board";
import { Coordinate } from "../../interfaces/Coordinate";
import { ShipType } from "../../interfaces/Ship";
import { ShipPlacement } from "../../interfaces/ShipPlacement";
import { getShipLength } from "../../utilities/getShipLength";
import BoardTile from "../BoardTile";
import {
  BoardContainer,
  TileGrid,
  CarrierGridIcon,
  VerticalCarrierGridIcon,
  BattleshipGridIcon,
  VerticalBattleshipGridIcon,
  CruiserGridIcon,
  VerticalCruiserGridIcon,
  PatrolBoatGridIcon,
  VerticalPatrolBoatGridIcon,
  SubmarineGridIcon,
  VerticalSubmarineGridIcon,
} from "./styles";

interface Props {
  board: Board;
  form: ShipPlacement;
  confirmShipPlacement: (shipPlacement: ShipPlacement) => void;
  removeShip: (shipType: ShipType) => void;
}

const GameBoard: FC<Props> = ({
  board,
  form,
  confirmShipPlacement,
  removeShip,
}) => {
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

  const generateTiles = () => {
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
        let style: React.CSSProperties = {
          gridRowStart: y + 1,
          gridRowEnd: y + 2,
          gridColumnStart: x + 1,
          gridColumnEnd: x + 2,
        };
        if (occupiedCoordinate) {
          grid.push(
            <BoardTile
              style={style}
              key={`${x},${y}`}
              occupied={true}
              highlight={shouldHighlight}
              x={x}
              y={y}
              dataShip={occupiedCoordinate.ship}
              onClick={() => removeShip(occupiedCoordinate.ship)}
              onMouseOver={() => {
                setHoverCoordinates({ x: -1, y: -1 });
              }}
            />
          );
        } else {
          grid.push(
            <BoardTile
              style={style}
              key={`${x},${y}`}
              occupied={false}
              highlight={shouldHighlight}
              x={x}
              y={y}
              dataShip={""}
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
    }
    return grid;
  };

  const generateShips = () => {
    const ships: JSX.Element[] = [];
    board.ships.forEach((ship) => {
      const { location, type } = ship;

      let direction: "horizontal" | "vertical";
      if (location[0].y === location[location.length - 1].y) {
        direction = "horizontal";
      } else {
        direction = "vertical";
      }
      let style: React.CSSProperties;
      const startRow = location[0].y + 1;
      const startColumn = location[0].x + 1;
      const length = ship.length + 1;
      let shipUI: JSX.Element;
      if (direction === "horizontal") {
        style = {
          gridRowStart: startRow,
          gridRowEnd: startRow + 1,
          gridColumnStart: startColumn,
          gridColumnEnd: startColumn + length - 1,
        };
      } else {
        // direction === "vertical"
        style = {
          gridRowStart: startRow,
          gridRowEnd: startRow + length - 1,
          gridColumnStart: startColumn,
          gridColumnEnd: startColumn + 1,
        };
      }

      if (type === "carrier" && direction === "horizontal") {
        shipUI = <CarrierGridIcon key={type} style={style} />;
      } else if (type === "carrier" && direction === "vertical") {
        shipUI = <VerticalCarrierGridIcon key={type} style={style} />;
      } else if (type === "battleship" && direction === "horizontal") {
        shipUI = <BattleshipGridIcon key={type} style={style} />;
      } else if (type === "battleship" && direction === "vertical") {
        shipUI = <VerticalBattleshipGridIcon key={type} style={style} />;
      } else if (type === "cruiser" && direction === "horizontal") {
        shipUI = <CruiserGridIcon key={type} style={style} />;
      } else if (type === "cruiser" && direction === "vertical") {
        shipUI = <VerticalCruiserGridIcon key={type} style={style} />;
      } else if (type === "submarine" && direction === "horizontal") {
        shipUI = <SubmarineGridIcon key={type} style={style} />;
      } else if (type === "submarine" && direction === "vertical") {
        shipUI = <VerticalSubmarineGridIcon key={type} style={style} />;
      } else if (type === "patrolBoat" && direction === "horizontal") {
        shipUI = <PatrolBoatGridIcon key={type} style={style} />;
      } else if (type === "patrolBoat" && direction === "vertical") {
        shipUI = <VerticalPatrolBoatGridIcon key={type} style={style} />;
      } else {
        throw new Error(
          `Can't find UI ship asset to match type: ${type} and direction: ${direction}`
        );
      }
      ships.push(shipUI);
    });
    return ships;
  };

  const grid: JSX.Element[] = generateTiles();
  const ships: JSX.Element[] = generateShips();

  return (
    <BoardContainer>
      <TileGrid
        onMouseLeave={() => {
          setHoverCoordinates(null);
          setHighlightedCoordinates([]);
        }}
        data-testid="gameboard"
      >
        {grid.map((tile) => tile)}
        {ships.map((ship) => ship)}
      </TileGrid>
    </BoardContainer>
  );
};

export default GameBoard;
