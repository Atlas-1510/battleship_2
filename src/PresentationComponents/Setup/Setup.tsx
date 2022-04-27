import { FC, useEffect, useReducer, useState } from "react";
import { Ship, shipTypesArray, ShipType } from "../../interfaces/Ship";
import { ShipPlacement } from "../../interfaces/ShipPlacement";

interface Props {
  confirmShipPlacement: (placement: ShipPlacement) => void;
  confirmationError: string;
}

type ACTIONTYPE =
  | { type: "changeShip"; payload: Ship }
  | { type: "changeX"; payload: number }
  | { type: "changeY"; payload: number }
  | { type: "changeDirection"; payload: "horizontal" | "vertical" };

const shipPlacementReducer = (state: ShipPlacement, action: ACTIONTYPE) => {
  switch (action.type) {
    case "changeShip":
      return { ...state, ship: action.payload };
    case "changeY":
      return { ...state, y: action.payload };

    case "changeX":
      return { ...state, x: action.payload };

    case "changeDirection":
      return { ...state, direction: action.payload };

    default:
      throw new Error(
        "Reducer in Setup presentation component recieved invalid action type"
      );
  }
};

const initialShipPlacementState: ShipPlacement = {
  x: -1,
  y: -1,
  direction: "horizontal",
  ship: null,
};

const SetupPresentationComponent: FC<Props> = ({
  confirmShipPlacement,
  confirmationError,
}) => {
  const [shipPlacementState, dispatch] = useReducer(
    shipPlacementReducer,
    initialShipPlacementState
  );
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (confirmationError) {
      setError(confirmationError);
    }
  }, [confirmationError]);

  const onSubmitShips = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const { ship, x, y, direction } = shipPlacementState;

    const validateCoordinate = (coord: any) => {
      if (!coord) {
        setError("onSubmitShips recieved undefined coordinate");
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
    if (!validateCoordinate(x) || !validateCoordinate(y)) {
      return;
    }
    if (!ship) {
      setError("Please choose ship");
    } else if (!direction) {
      setError("Please choose direction");
    } else {
      confirmShipPlacement({ ship, x, y, direction });
    }
  };

  const processDirectionSelection = (v: string): "horizontal" | "vertical" => {
    if (v === "horizontal" || v === "vertical") {
      return v;
    } else {
      throw new Error(
        `Payload in 'ship placement direction' selection is ${v}, it must be 'vertical' or 'horizontal'`
      );
    }
  };

  const generateShip = (formInput: string): Ship => {
    const _isShipType = (input: string): input is ShipType => {
      return shipTypesArray.includes(input);
    };
    if (!_isShipType(formInput)) {
      throw new Error("generateShip recieved invalid ShipType");
    }

    const newShip: Ship = {
      type: formInput,
      hits: [],
      location: [],
      alive: true,
      length: 0,
    };

    switch (formInput) {
      case "carrier":
        newShip.length = 5;
        break;
      case "battleship":
        newShip.length = 4;
        break;
      case "cruiser":
        newShip.length = 3;
        break;
      case "submarine":
        newShip.length = 3;
        break;
      case "patrolBoat":
        newShip.length = 2;
        break;
      default:
        throw new Error(
          "generateShip recieved invalid shipType in switch block"
        );
    }

    return newShip;
  };

  return (
    <>
      <h1>Place your ships</h1>
      <form onSubmit={(e) => onSubmitShips(e)}>
        <label htmlFor="ship-select" />
        <select
          data-testid="ship-select"
          name="ship"
          id="ship-select"
          defaultValue=""
          onChange={(e) =>
            dispatch({
              type: "changeShip",
              payload: generateShip(e.target.value),
            })
          }
        >
          <option value="" disabled>
            Please select ship
          </option>
          <option value="carrier">carrier</option>
          <option value="battleship">battleship</option>
          <option value="cruiser">cruiser</option>
          <option value="submarine">submarine</option>
          <option value="patrolBoat">patrolBoat</option>
        </select>
        <label>
          X
          <input
            onChange={(e) =>
              dispatch({ type: "changeX", payload: Number(e.target.value) })
            }
            type="number"
            value={shipPlacementState.x}
          />
        </label>
        <label>
          Y
          <input
            onChange={(e) =>
              dispatch({ type: "changeY", payload: Number(e.target.value) })
            }
            type="number"
            value={shipPlacementState.y}
          />
        </label>
        <label htmlFor="direction-select" />
        <select
          data-testid="direction-select"
          name="direction"
          id="direction-select"
          defaultValue="horizontal"
          onChange={(e) =>
            dispatch({
              type: "changeDirection",
              payload: processDirectionSelection(e.target.value),
            })
          }
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default SetupPresentationComponent;
