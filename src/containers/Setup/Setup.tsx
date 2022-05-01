import { useReducer, useState } from "react";
import { Board } from "../../interfaces/Board";
import { ShipType, Ship } from "../../interfaces/Ship";
import { ShipPlacement } from "../../interfaces/ShipPlacement";
import { Coordinate } from "../../interfaces/Coordinate";
import SetupFormPresentationComponent from "../../PresentationComponents/SetupForm/index";
import GameBoardPresentationComponent from "../../PresentationComponents/GameBoard/index";
import SetupView from "../../views/Setup/SetupView";
import { getShipLength } from "../../utilities/getShipLength";

const SetupContainer = () => {
  const initialFormState: ShipPlacement = {
    x: -1,
    y: -1,
    direction: "horizontal",
    ship: "carrier",
  };

  const initialBoardState: Board = {
    recievedStrikes: [],
    ships: [],
  };

  type ACTIONTYPE =
    | { type: "changeShip"; payload: ShipType }
    | { type: "changeCoordinate"; payload: { axis: "x" | "y"; value: number } }
    | { type: "changeDirection"; payload: "horizontal" | "vertical" };

  const formStateReducer = (state: ShipPlacement, action: ACTIONTYPE) => {
    switch (action.type) {
      case "changeShip":
        return { ...state, ship: action.payload };
      case "changeCoordinate":
        if (action.payload.axis === "x") {
          return { ...state, x: action.payload.value };
        } else if (action.payload.axis === "y") {
          return { ...state, y: action.payload.value };
        } else {
          throw new Error("invalid axis in updateCoordinate");
        }
      case "changeDirection":
        return { ...state, direction: action.payload };

      default:
        throw new Error(
          "Reducer in Setup presentation component recieved invalid action type"
        );
    }
  };

  const [form, dispatch] = useReducer(formStateReducer, initialFormState);
  const [board, setBoard] = useState(initialBoardState);
  const [error, setError] = useState("");

  const confirmShipPlacement = (shipPlacement: ShipPlacement) => {
    // update form x and y, just for debugging purposes.
    // Actual ship placement doesn't rely on x and y from form input,
    // the x and y are passed directly from the tile that is clicked
    dispatch({
      type: "changeCoordinate",
      payload: { axis: "x", value: shipPlacement.x },
    });
    dispatch({
      type: "changeCoordinate",
      payload: { axis: "y", value: shipPlacement.y },
    });

    setError("");

    const _validateInputs = (input: ShipPlacement) => {
      const validateCoordinate = (coord: any) => {
        if (typeof coord === "undefined") {
          setError(
            `onSubmitShips recieved undefined coordinate, x: ${input.x}, y: ${input.y}`
          );
          return false;
        }
        if (typeof coord !== "number") {
          setError("Invalid type for coordinate input");
          return false;
        }
        if (coord > 9 || coord < 0) {
          setError("Invalid value for coordinate input");
          return false;
        }
        return true;
      };
      if (!validateCoordinate(input.x) || !validateCoordinate(input.y)) {
        return false;
      }
      if (!input.ship) {
        setError("Please choose ship");
        return false;
      } else if (!input.direction) {
        setError("Please choose direction");
        return false;
      }
      return true;
    };
    const _generateShip = (formInput: ShipType): Ship => {
      const newShip: Ship = {
        type: formInput,
        hits: [],
        location: [],
        alive: true,
        length: 0,
      };

      newShip.length = getShipLength(formInput);

      return newShip;
    };
    const _checkIfShipAlreadyPlaced = (shipType: ShipType) => {
      if (board.ships.filter((ship) => ship.type === shipType).length > 0) {
        return true;
      } else {
        return false;
      }
    };

    if (!board) {
      throw new Error(
        "confirmShipPlacement called when board has not been initialised"
      );
    }
    if (_checkIfShipAlreadyPlaced(shipPlacement.ship)) {
      setError("That ship has already been placed");
      return;
    }
    if (!_validateInputs(shipPlacement)) {
      return;
    }
    const { ship: shipType, x, y, direction } = shipPlacement;
    if (!shipType) {
      throw new Error(
        "confirmShipPlacement called without ship type in shipPlacement object"
      );
    }

    const ship = _generateShip(shipType);

    const newShipCoordinates: Coordinate[] = [];

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        let newCoordinate = { x: x + i, y: y };
        newShipCoordinates.push(newCoordinate);
      } else {
        let newCoordinate = { x: x, y: y + i };
        newShipCoordinates.push(newCoordinate);
      }
    }

    // validate the coordinates are all on the board
    let failOffBoardValidation = false;
    newShipCoordinates.forEach((coordinate) => {
      if (
        coordinate.x > 9 ||
        coordinate.x < 0 ||
        coordinate.y > 9 ||
        coordinate.y < 0
      ) {
        failOffBoardValidation = true;
      }
    });

    if (failOffBoardValidation) {
      setError("Please place the ship entirely on the board");
      return;
    }

    // validate the new ship won't overlap other ships
    const occupiedTiles = board.ships.map((ship) => ship.location).flat();

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

    // Validation passed - update board with ship
    ship.location = newShipCoordinates;
    const newBoardState = Object.assign({}, board);
    newBoardState.ships.push(ship);

    setBoard(newBoardState);
  };

  const removeShip = (shipType: ShipType) => {
    const matchedShips = board.ships.filter((ship) => ship.type === shipType);
    if (matchedShips.length > 1) {
      throw new Error(
        `removeShip found more than one ship of type: ${shipType}`
      );
    }
    if (matchedShips[0]) {
      const boardWithoutShip = {
        ...board,
        ships: board.ships.filter((ship) => ship !== matchedShips[0]),
      };
      setBoard(boardWithoutShip);
    } else {
      throw new Error(
        `removeShip called with a shipType that hasn't been placed: ${shipType}`
      );
    }
  };

  return (
    <SetupView>
      <SetupFormPresentationComponent
        placedShips={board.ships.map((ship) => ship.type)}
        error={error}
        updateFormShip={(ship: ShipType) =>
          dispatch({ type: "changeShip", payload: ship })
        }
        updateCoordinate={(axis: "x" | "y", value: number) =>
          dispatch({ type: "changeCoordinate", payload: { axis, value } })
        }
        updateDirection={(direction: "horizontal" | "vertical") =>
          dispatch({ type: "changeDirection", payload: direction })
        }
        confirmShipPlacement={confirmShipPlacement}
        formState={form}
      />
      <GameBoardPresentationComponent
        board={board}
        form={form}
        confirmShipPlacement={confirmShipPlacement}
        removeShip={removeShip}
      />
    </SetupView>
  );
};

export default SetupContainer;
