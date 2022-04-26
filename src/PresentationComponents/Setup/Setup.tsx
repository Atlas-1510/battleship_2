import { FC, useReducer } from "react";

interface ShipPlacement {
  x: number;
  y: number;
  direction: "horizontal" | "vertical";
}

interface Props {
  confirmShipPlacement: (
    x: number,
    y: number,
    direction: "horizontal" | "vertical"
  ) => void;
}

type ACTIONTYPE =
  | { type: "changeX"; payload: number }
  | { type: "changeY"; payload: number }
  | { type: "changeDirection"; payload: "horizontal" | "vertical" };

const shipPlacementReducer = (state: ShipPlacement, action: ACTIONTYPE) => {
  switch (action.type) {
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
};

const SetupPresentationComponent: FC<Props> = ({ confirmShipPlacement }) => {
  const [shipPlacementState, dispatch] = useReducer(
    shipPlacementReducer,
    initialShipPlacementState
  );

  const onSubmitShips = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { x, y, direction } = shipPlacementState;
    if (!x || !y || !direction) {
      throw new Error(
        "Tried to confirm ship placement while x, y, or direction were not defined"
      );
    }

    confirmShipPlacement(x, y, direction);
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

  return (
    <>
      <h1>Place your ships</h1>
      <form onSubmit={(e) => onSubmitShips(e)}>
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
    </>
  );
};

export default SetupPresentationComponent;
