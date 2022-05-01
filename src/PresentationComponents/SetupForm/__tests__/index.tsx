import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SetupFormPresentationComponent from "..";
import { ShipPlacement } from "../../../interfaces/ShipPlacement";

const initFormState: ShipPlacement = {
  x: -1,
  y: -1,
  direction: "horizontal",
  ship: "carrier",
};

const updateDirectionMock = jest.fn();

const setup = (error?: string) => {
  return render(
    <SetupFormPresentationComponent
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
});
