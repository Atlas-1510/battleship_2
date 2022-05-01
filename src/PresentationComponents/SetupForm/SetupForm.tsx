import { FC, useEffect } from "react";
import { ShipType } from "../../interfaces/Ship";
import { ShipPlacement } from "../../interfaces/ShipPlacement";
import Ship from "../Ship/Ship";
import { ShipsContainer } from "./styles";

interface Props {
  formState: ShipPlacement;
  updateFormShip: (ship: ShipType) => void;
  updateCoordinate: (axis: "x" | "y", value: number) => void;
  updateDirection: (direction: "horizontal" | "vertical") => void;
  error: string | null;
  confirmShipPlacement: (shipPlacement: ShipPlacement) => void;
}

const SetupFormPresentationComponent: FC<Props> = ({
  error,
  formState,
  updateFormShip,
  updateCoordinate,
  updateDirection,
  confirmShipPlacement,
}) => {
  useEffect(() => {
    const handleDirectionChangeRequest = (e: KeyboardEvent) => {
      if (e.key === "r") {
        updateDirection(
          formState.direction === "horizontal" ? "vertical" : "horizontal"
        );
      }
    };
    document.addEventListener("keydown", handleDirectionChangeRequest);

    return () => {
      document.removeEventListener("keydown", handleDirectionChangeRequest);
    };
  }, [updateDirection, formState]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmShipPlacement(formState);
  };

  return (
    <div>
      <h1>Place your ships</h1>
      <p>Press r to rotate your ship</p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="ship-select">Ship</label>
        <select
          data-testid="ship-select"
          name="ship"
          id="ship-select"
          value={formState.ship || ""}
          onChange={(e) => updateFormShip(e.target.value as ShipType)}
        >
          <option value="carrier">carrier</option>
          <option value="battleship">battleship</option>
          <option value="cruiser">cruiser</option>
          <option value="submarine">submarine</option>
          <option value="patrolBoat">patrolBoat</option>
        </select>
        <label>
          X
          <select
            onChange={(e) => updateCoordinate("x", parseInt(e.target.value))}
            value={formState.x || ""}
          >
            <option value={-1} disabled>
              Please select X
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </label>
        <label>
          Y
          <select
            onChange={(e) => updateCoordinate("y", parseInt(e.target.value))}
            value={formState.y || ""}
          >
            <option value={-1} disabled>
              Please select Y
            </option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </label>
        <label htmlFor="direction-select">Direction</label>
        <select
          data-testid="direction-select"
          name="direction"
          id="direction-select"
          value={formState.direction || ""}
          onChange={(e) =>
            updateDirection(e.target.value as "horizontal" | "vertical")
          }
        >
          <option value="horizontal">horizontal</option>
          <option value="vertical">vertical</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {error ? <p>{error}</p> : null}
      <ShipsContainer>
        <Ship
          selected={formState.ship === "carrier"}
          shipType="carrier"
          onClick={() => updateFormShip("carrier")}
        />
        <Ship
          selected={formState.ship === "battleship"}
          shipType="battleship"
          onClick={() => updateFormShip("battleship")}
        />
        <Ship
          selected={formState.ship === "cruiser"}
          shipType="cruiser"
          onClick={() => updateFormShip("cruiser")}
        />
        <Ship
          selected={formState.ship === "submarine"}
          shipType="submarine"
          onClick={() => updateFormShip("submarine")}
        />
        <Ship
          selected={formState.ship === "patrolBoat"}
          shipType="patrolBoat"
          onClick={() => updateFormShip("patrolBoat")}
        />
      </ShipsContainer>
    </div>
  );
};

export default SetupFormPresentationComponent;
