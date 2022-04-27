import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SetupPresentationComponent from "..";

const mockConfirmShipPlacements = jest.fn();

const setup = (error?: string) => {
  return render(
    <SetupPresentationComponent
      confirmationError={error || ""}
      confirmShipPlacement={mockConfirmShipPlacements}
    />
  );
};

const triggerShipPlacement = (
  shipType: string | null,
  x: number | null,
  y: number | null,
  direction: string | null
) => {
  const shipInput = screen.getByTestId("ship-select");
  const Xinput = screen.getByRole("spinbutton", { name: "X" });
  const Yinput = screen.getByRole("spinbutton", { name: "Y" });
  const submitButton = screen.getByRole("button", { name: "Submit" });
  const directionSelector = screen.getByTestId("direction-select");

  if (shipType) {
    user.selectOptions(shipInput, shipType);
  }
  if (x || x === 0) {
    user.type(Xinput, `${x}{ArrowLeft}{Backspace>2}`);
  }
  if (y || y === 0) {
    user.type(Yinput, `${y}{ArrowLeft}{Backspace>2}`);
  }
  if (direction) {
    user.selectOptions(directionSelector, direction);
  }
  user.click(submitButton);
};

describe("SetupPresentationComponent", () => {
  test("Renders UI", () => {
    setup();

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
    const Xinput = screen.getByRole("spinbutton", { name: "X" });
    expect(Xinput).toBeInTheDocument();
    const Yinput = screen.getByRole("spinbutton", { name: "Y" });
    expect(Yinput).toBeInTheDocument();
  });

  test("When form is submitted, confirmShipPlacements function is called with correct arguments", () => {
    setup();
    triggerShipPlacement("carrier", 1, 2, "horizontal");

    expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
    expect(mockConfirmShipPlacements.mock.calls[0][0].ship.type).toBe(
      "carrier"
    );
    expect(mockConfirmShipPlacements.mock.calls[0][0].x).toBe(1);
    expect(mockConfirmShipPlacements.mock.calls[0][0].y).toBe(2);
    expect(mockConfirmShipPlacements.mock.calls[0][0].direction).toBe(
      "horizontal"
    );
  });

  test("If try to submit without selecting ship, render error to user", async () => {
    setup();
    triggerShipPlacement(null, 5, 5, "horizontal");
    const error = await screen.findByText("Please choose ship");
    expect(error).toBeInTheDocument();
  });

  test("If try to submit with invalid coordinates, render error to user", async () => {
    setup();
    triggerShipPlacement("carrier", null, null, "horizontal");
    const error = await screen.findByText("Invalid value for coordinate input");
    expect(error).toBeInTheDocument();
  });

  test("If confirmation error prop is provided, render the error to user", async () => {
    setup("Some error message from SetupContainer");
    const error = await screen.findByText(
      "Some error message from SetupContainer"
    );
    expect(error).toBeInTheDocument();
  });

  test("Handles when user places a ship with x coordinate equal to 0", () => {
    setup();
    triggerShipPlacement("carrier", 0, 1, "horizontal");
    expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
    expect(
      screen.queryByText("onSubmitShips recieved undefined coordinate")
    ).not.toBeInTheDocument();
  });
  test("Handles when user places a ship with y coordinate equal to 0", () => {
    setup();
    triggerShipPlacement("carrier", 1, 0, "horizontal");
    expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
    expect(
      screen.queryByText("onSubmitShips recieved undefined coordinate")
    ).not.toBeInTheDocument();
  });
});
