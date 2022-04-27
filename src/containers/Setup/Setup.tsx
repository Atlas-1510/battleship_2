import { useGameContext } from "../../hooks/useGameContext";

import SetupPresentationComponent from "../../PresentationComponents/Setup";

import generateGame from "../../utilities/generateGame";
import { ShipPlacement } from "../../interfaces/ShipPlacement";
import { Coordinate } from "../../interfaces/Coordinate";
import { useState } from "react";

const SetupContainer = () => {
  const { game, setGame } = useGameContext();
  const [error, setError] = useState("");

  const confirmShipPlacement = (placement: ShipPlacement) => {
    if (
      !placement.ship ||
      !placement.direction ||
      typeof placement.x === "undefined" ||
      typeof placement.y === "undefined"
    ) {
      throw new Error("confirmShipPlacement called with missing input");
    }

    const gameState = game || generateGame();

    const newShipCoordinates: Coordinate[] = [];
    const {
      ship: { length },
      direction,
      x,
      y,
    } = placement;

    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        let newCoordinate = { x: x + i, y: y };
        newShipCoordinates.push(newCoordinate);
      } else {
        let newCoordinate = { x: x, y: y + i };
        newShipCoordinates.push(newCoordinate);
      }
    }

    // validate the coordinates are all on the board
    newShipCoordinates.forEach((coordinate) => {
      if (
        coordinate.x > 9 ||
        coordinate.x < 0 ||
        coordinate.y > 9 ||
        coordinate.y < 0
      ) {
        setError("Please place the ship entirely on the board");

        return;
      }
    });

    // validate the new ship won't overlap other ships
    const occupiedTiles = gameState.boardOne.ships
      .map((ship) => ship.location)
      .flat();

    let failOverlapValidation = false;

    for (const coord of newShipCoordinates) {
      for (const occupiedCoord of occupiedTiles) {
        if (coord.x === occupiedCoord.x && coord.y === occupiedCoord.y) {
          failOverlapValidation = true;
        }
      }
    }

    if (failOverlapValidation) {
      setError("Ships cannot overlap each other");
      return;
    }

    const newShip = placement.ship;
    newShip.location = newShipCoordinates;
    gameState.boardOne.ships.push(newShip);

    setGame(gameState);
  };

  return (
    <>
      <SetupPresentationComponent
        confirmationError={error}
        confirmShipPlacement={confirmShipPlacement}
      />
    </>
  );
};
export default SetupContainer;
