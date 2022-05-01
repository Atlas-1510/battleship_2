import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SetupFormPresentationComponent from "..";
import { ShipType } from "../../../interfaces/Ship";
import { ShipPlacement } from "../../../interfaces/ShipPlacement";

const initFormState: ShipPlacement = {
  x: -1,
  y: -1,
  direction: "horizontal",
  ship: "carrier",
};

const updateDirectionMock = jest.fn();

const setup = (error?: string, placedShips?: ShipType[]) => {
  return render(
    <SetupFormPresentationComponent
      placedShips={placedShips || []}
      formState={initFormState}
      updateFormShip={jest.fn()}
      updateCoordinate={jest.fn()}
      updateDirection={updateDirectionMock}
      error={error || null}
      confirmShipPlacement={jest.fn()}
    />
  );
};

describe("SetupPresentationComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("If error, renders error to user", () => {
    setup("some error text");
    expect(screen.getByText("some error text")).toBeInTheDocument();
  });
  test("If user presses 'r', change ship placement direction", () => {
    setup();
    user.keyboard("r");
    expect(updateDirectionMock.mock.calls.length).toBe(1);
    user.keyboard("r");
    expect(updateDirectionMock.mock.calls.length).toBe(2);
  });
  test("If a ship is already placed, apply 'placed' data attribute to form ship selector", () => {
    setup(undefined, ["carrier"]);
    const carrierSelector = screen.getByTestId("carrier");
    expect(carrierSelector.getAttribute("data-placed")).toBe("true");
  });
  test("Disables start game button unless all ships are placed", () => {
    setup();
    const startGameButton = screen.getByRole("button", { name: "Start Game!" });
    expect(startGameButton).toBeDisabled();
  });
  test("Enables start game button if all ships are placed", () => {
    setup(undefined, [
      "carrier",
      "battleship",
      "cruiser",
      "submarine",
      "patrolBoat",
    ]);
    const startGameButton = screen.getByRole("button", { name: "Start Game!" });
    expect(startGameButton).not.toBeDisabled();
  });
});
