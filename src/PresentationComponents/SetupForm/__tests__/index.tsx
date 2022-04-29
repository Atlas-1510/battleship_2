import { render, screen } from "@testing-library/react";
import SetupFormPresentationComponent from "..";
import { ShipPlacement } from "../../../interfaces/ShipPlacement";

const initFormState: ShipPlacement = {
  x: -1,
  y: -1,
  direction: "horizontal",
  ship: "carrier",
};

const setup = (error?: string) => {
  return render(
    <SetupFormPresentationComponent
      formState={initFormState}
      updateFormShip={jest.fn()}
      updateCoordinate={jest.fn()}
      updateDirection={jest.fn()}
      error={error || null}
      confirmShipPlacement={jest.fn()}
    />
  );
};

describe("SetupPresentationComponent", () => {
  test("If error, renders error to user", () => {
    setup("some error text");
    expect(screen.getByText("some error text")).toBeInTheDocument();
  });
});
