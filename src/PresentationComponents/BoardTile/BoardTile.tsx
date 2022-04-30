import React, { FC } from "react";
import { Coordinate } from "../../interfaces/Coordinate";
import {
  TileContainer,
  OccupiedTileContainer,
  HighlightTileContainer,
} from "./styles";

interface Props {
  x: number;
  y: number;
  occupied: boolean;
  highlight: boolean;
  dataShip: string;
  onClick: () => void;
  onMouseOver: () => void;
}

const BoardTile: FC<Props> = ({
  x,
  y,
  occupied,
  highlight,
  dataShip,
  onClick,
  onMouseOver,
}) => {
  if (highlight) {
    return (
      <HighlightTileContainer
        onClick={onClick}
        data-testid={`${x},${y}`}
        data-ship={dataShip || ""}
      >
        {x},{y}
      </HighlightTileContainer>
    );
  }
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
        onMouseOver={onMouseOver}
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
