import { useGameContext } from "../../hooks/useGameContext";
import { ShipType, Ship } from "../../interfaces/Ship";
import SetupPresentationComponent from "../../PresentationComponents/Setup";
import { Game } from "../../interfaces/Game";
import generateGame from "../../utilities/generateGame";
import { ShipPlacement } from "../../interfaces/ShipPlacement";
import { Coordinate } from "../../interfaces/Coordinate";

const SetupContainer = () => {
  const { game, setGame } = useGameContext();

  const confirmShipPlacement = (placement: ShipPlacement) => {
    // validate input
    if (
      !placement.ship ||
      !placement.direction ||
      !placement.x ||
      !placement.y
    ) {
      throw new Error("confirmShipPlacement called with missing input");
    }
    const gameState = game || generateGame();

    // add the ship placement to the gameboard
    // generate the coordinates the ship will occupy
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
      if (coordinate.x > 9 || coordinate.x < 0) {
        throw new Error(
          `Tried to place ship off the board. X: ${coordinate.x}, Y: ${coordinate.y}`
        );
      }
      if (coordinate.y > 9 || coordinate.y < 0) {
        throw new Error(
          `Tried to place ship off the board. X: ${coordinate.x}, Y: ${coordinate.y}`
        );
      }
    });

    // validate the coordinates don't overlap other ships --> todo.

    const newShip = placement.ship;
    newShip.location = newShipCoordinates;

    gameState.boardOne.ships.push(newShip);

    // update the game state
    setGame(gameState);
  };

  return (
    <>
      <SetupPresentationComponent confirmShipPlacement={confirmShipPlacement} />
    </>
  );
};
export default SetupContainer;
