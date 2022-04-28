import { FC } from "react";
import { ShipType } from "../../interfaces/Ship";
import { Board } from "../../interfaces/Board";
import { ShipPlacement } from "../../interfaces/ShipPlacement";

interface Props {
  board: Board;
  formState: ShipPlacement;
  updateFormShip: (ship: ShipType) => void;
  updateCoordinate: (axis: "x" | "y", value: number) => void;
  updateDirection: (direction: "horizontal" | "vertical") => void;
  error: string | null;
  confirmShipPlacement: () => void;
}

const SetupPresentationComponent: FC<Props> = ({
  board,
  error,
  formState,
  updateFormShip,
  updateCoordinate,
  updateDirection,
  confirmShipPlacement,
}) => {
  return (
    <>
      <h1>Place your ships</h1>
      <form onSubmit={confirmShipPlacement}>
        <label htmlFor="ship-select">Ship</label>
        <input
          type="text"
          data-testid="ship-select"
          name="ship"
          id="ship-select"
          value={formState.ship || ""}
          onChange={(e) => updateFormShip(e.target.value as ShipType)}
        ></input>
        <label>
          X
          <input
            onChange={(e) => updateCoordinate("x", parseInt(e.target.value))}
            type="text"
            value={formState.x}
          />
        </label>
        <label>
          Y
          <input
            onChange={(e) => updateCoordinate("y", parseInt(e.target.value))}
            type="text"
            value={formState.y}
          />
        </label>
        <label htmlFor="direction-select">Direction</label>
        <input
          type="text"
          data-testid="direction-select"
          name="direction"
          id="direction-select"
          value={formState.direction || "horizontal"}
          onChange={(e) =>
            updateDirection(e.target.value as "horizontal" | "vertical")
          }
        ></input>
      </form>
      {error ? <p>{error}</p> : null}
    </>
  );
};

export default SetupPresentationComponent;
