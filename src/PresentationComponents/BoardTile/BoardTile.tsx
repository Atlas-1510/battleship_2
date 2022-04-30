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
  } else if (highlight) {
    return (
      <HighlightTileContainer
        onClick={onClick}
        onMouseOver={onMouseOver}
        data-testid={`${x},${y}`}
        data-ship={dataShip || ""}
      >
        {x},{y}
      </HighlightTileContainer>
    );
  } else {
    return (
      <TileContainer
        onClick={onClick}
        onMouseOver={onMouseOver}
        data-testid={`${x},${y}`}
        data-ship={dataShip || ""}
      >
        {x},{y}
      </TileContainer>
    );
  }
};

export default BoardTile;
