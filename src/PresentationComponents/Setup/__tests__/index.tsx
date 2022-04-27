import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SetupPresentationComponent from "..";
import { ShipType } from "../../../interfaces/Ship";
import { ShipPlacement } from "../../../interfaces/ShipPlacement";

const mockConfirmShipPlacements = jest.fn();

const getShipInput = () => screen.getByTestId("ship-select");
const getXinput = () => screen.getByRole("spinbutton", { name: "X" });
const getYinput = () => screen.getByRole("spinbutton", { name: "Y" });
const getSubmitButton = () => screen.getByRole("button", { name: "Submit" });
const getDirectionSelector = () => screen.getByTestId("direction-select");

const setup = (error?: string) => {
  return render(
    <SetupPresentationComponent
      confirmationError={error || ""}
      confirmShipPlacement={mockConfirmShipPlacements}
    />
  );
};

const triggerShipPlacement = (placement: ShipPlacement) => {
  if (!placement.ship) {
    throw new Error("triggerShipPlacement missing ship type");
  }
  const shipInput = screen.getByTestId("ship-select");
  const Xinput = screen.getByRole("spinbutton", { name: "X" });
  const Yinput = screen.getByRole("spinbutton", { name: "Y" });
  const submitButton = screen.getByRole("button", { name: "Submit" });
  const directionSelector = screen.getByTestId("direction-select");

  user.selectOptions(shipInput, placement.ship.type);
  user.type(Xinput, `${placement.x}{ArrowLeft}{Backspace>2}`);
  user.type(Yinput, `${placement.y}{ArrowLeft}{Backspace>2}`);
  user.selectOptions(directionSelector, placement.direction);
  user.click(submitButton);
};

describe("SetupPresentationComponent", () => {
  test("Renders UI", () => {
    setup();

    const button = getSubmitButton();
    expect(button).toBeInTheDocument();
    const Xinput = getXinput();
    expect(Xinput).toBeInTheDocument();
    const Yinput = getYinput();
    expect(Yinput).toBeInTheDocument();
  });

  test("When form is submitted, confirmShipPlacements function is called with correct arguments", () => {
    setup();
    const shipInput = getShipInput();
    user.selectOptions(shipInput, "carrier");
    const Xinput = getXinput();
    const Yinput = getYinput();
    // user.type(Xinput, "{ArrowUp>2/}"); // note, trying to programatically change the Xinput to '1' from '-1'. Doing it by arrow keys doesn't fire the onChange event,
    // so needed to manually 'press' the keyboard keys instead
    user.type(Xinput, "{ArrowLeft}{Backspace}"); // to enter '1'
    user.type(Yinput, "2{ArrowLeft}{Backspace>2}"); // to enter '2'
    const directionSelection = getDirectionSelector();
    user.selectOptions(directionSelection, "horizontal");
    const button = getSubmitButton();
    user.click(button);
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
    const Xinput = getXinput();
    const Yinput = getYinput();
    // user.type(Xinput, "{ArrowUp>2/}"); // note, trying to programatically change the Xinput to '1' from '-1'. Doing it by arrow keys doesn't fire the onChange event,
    // so needed to manually 'press' the keyboard keys instead
    user.type(Xinput, "5{ArrowLeft}{Backspace>2}"); // to enter '5'
    user.type(Yinput, "5{ArrowLeft}{Backspace>2}"); // to enter '5'
    const directionSelection = getDirectionSelector();
    user.selectOptions(directionSelection, "horizontal");
    const button = getSubmitButton();
    user.click(button);
    const error = await screen.findByText("Please choose ship");
    expect(error).toBeInTheDocument();
  });

  test("If try to submit with invalid coordinates, render error to user", async () => {
    setup();
    const shipInput = getShipInput();
    user.selectOptions(shipInput, "carrier");
    const button = getSubmitButton();
    user.click(button);
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
    triggerShipPlacement({
      ship: {
        type: "carrier",
        length: 5,
        hits: [],
        alive: true,
        location: [],
      },
      x: 0,
      y: 1,
      direction: "horizontal",
    });
    expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
    expect(
      screen.queryByText("onSubmitShips recieved undefined coordinate")
    ).not.toBeInTheDocument();
  });
  test("Handles when user places a ship with y coordinate equal to 0", () => {
    setup();
    triggerShipPlacement({
      ship: {
        type: "carrier",
        length: 5,
        hits: [],
        alive: true,
        location: [],
      },
      x: 1,
      y: 0,
      direction: "horizontal",
    });
    expect(mockConfirmShipPlacements.mock.calls.length).toBe(1);
    expect(
      screen.queryByText("onSubmitShips recieved undefined coordinate")
    ).not.toBeInTheDocument();
  });
});
