import React, { FC } from "react";
import { TileContainer, OccupiedTileContainer } from "./styles";

interface Props {
  x: number;
  y: number;
  occupied: boolean;
  dataShip: string;
  onClick: () => void;
}

const BoardTile: FC<Props> = ({ x, y, occupied, dataShip, onClick }) => {
  if (occupied) {
    return (
      <OccupiedTileContainer
        onClick={onClick}
        data-testid={`${x},${y}`}
        data-ship={dataShip || ""}
      >
        {x},{y}
      </OccupiedTileContainer>
    );
  } else {
    return (
      <TileContainer
        onClick={onClick}
        data-testid={`${x},${y}`}
        data-ship={dataShip || ""}
      >
        {x},{y}
      </TileContainer>
    );
  }
};

export default BoardTile;

//  <TileContainer
//    key={`${x},${y}`}
//    data-x={x}
//    data-y={y}
//    data-testid={`${x},${y}`}
//    data-ship={occupiedCoordinate.ship || ""}
//    onClick={() => {
//      confirmShipPlacement({
//        ship: form.ship,
//        x,
//        y,
//        direction: form.direction,
//      });
//    }}
//  >
//
//  </TileContainer>;
