import { render, screen, waitFor } from "@testing-library/react";
import SetupContainer from "..";
import user from "@testing-library/user-event";

import { ShipPlacement } from "../../../interfaces/ShipPlacement";

const setupWithRealUI = () => {
  return render(<SetupContainer />);
};

const triggerShipPlacement = (placement: ShipPlacement) => {
  if (!placement.ship) {
    throw new Error("triggerShipPlacement missing ship type");
  }
  const shipInput = screen.getByTestId("ship-select");
  const Xinput = screen.getByRole("combobox", { name: "X" });
  const Yinput = screen.getByRole("combobox", { name: "Y" });
  const submitButton = screen.getByRole("button", { name: "Submit" });
  const directionSelector = screen.getByTestId("direction-select");

  user.selectOptions(shipInput, placement.ship);
  user.selectOptions(Xinput, placement.x.toString());
  user.selectOptions(Yinput, placement.y.toString());
  user.selectOptions(directionSelector, placement.direction);
  user.click(submitButton);
};

describe("SetupContainer", () => {
  test("Renders actual UI", () => {
    setupWithRealUI();
    const title = screen.getByText("Place your ships");
    expect(title).toBeInTheDocument();
  });

  test("If recieves valid ship placement, places ship in correct location and updates board UI", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 1,
      y: 1,
      direction: "horizontal",
    });

    const tile_X1_Y1 = screen.getByTestId("1,1");
    const tile_X5_Y1 = screen.getByTestId("5,1");
    const tile_X1_Y5 = screen.getByTestId("1,5");
    expect(tile_X1_Y1.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X5_Y1.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X1_Y5.getAttribute("data-ship")).not.toBe("carrier");
  });

  test("Handles placement of ship when x coordinate is 0", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 0,
      y: 1,
      direction: "horizontal",
    });

    const tile_X0_Y1 = screen.getByTestId("0,1");
    const tile_X4_Y1 = screen.getByTestId("4,1");
    expect(tile_X0_Y1.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X4_Y1.getAttribute("data-ship")).toBe("carrier");
  });

  test("Handles placement of ship when y coordinate is 0", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 1,
      y: 0,
      direction: "vertical",
    });

    const tile_X1_Y0 = screen.getByTestId("1,0");
    const tile_X1_Y4 = screen.getByTestId("1,4");
    expect(tile_X1_Y0.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X1_Y4.getAttribute("data-ship")).toBe("carrier");
  });

  test("If place ship off board horizontally, render error to user", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 8,
      y: 1,
      direction: "horizontal",
    });
    const error = screen.getByText(
      "Please place the ship entirely on the board"
    );
    expect(error).toBeInTheDocument();
    const tile_X8_Y1 = screen.getByTestId("8,1");
    expect(tile_X8_Y1.getAttribute("data-ship")).not.toBe("carrier");
  });

  test("If place ship off board vertically, render error to user", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 1,
      y: 8,
      direction: "vertical",
    });
    const error = screen.getByText(
      "Please place the ship entirely on the board"
    );
    expect(error).toBeInTheDocument();
    const tile_X1_Y8 = screen.getByTestId("1,8");
    expect(tile_X1_Y8.getAttribute("data-ship")).not.toBe("carrier");
  });

  test("If place ship that overlaps another ship, render error to user", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 2,
      y: 0,
      direction: "vertical",
    });
    triggerShipPlacement({
      ship: "battleship",
      x: 1,
      y: 1,
      direction: "horizontal",
    });
    const error = screen.getByText("Ships cannot overlap each other");
    expect(error).toBeInTheDocument();
    const tile_X2_Y1 = screen.getByTestId("2,1");
    const tile_X2_Y2 = screen.getByTestId("2,2");
    expect(tile_X2_Y1.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X2_Y1.getAttribute("data-ship")).not.toBe("battleship");
    expect(tile_X2_Y2.getAttribute("data-ship")).not.toBe("battleship");
  });
  test("If try to submit with invalid coordinates, render error to user", async () => {
    setupWithRealUI();
    user.click(screen.getByRole("button", { name: "Submit" }));
    const error = await screen.findByText("Invalid value for coordinate input");
    expect(error).toBeInTheDocument();
  });
  test("Prevent more than one of each type of ship from being placed on the board", () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 1,
      y: 2,
      direction: "horizontal",
    });
    triggerShipPlacement({
      ship: "carrier",
      x: 1,
      y: 4,
      direction: "horizontal",
    });
    const tile_X1_Y4 = screen.getByTestId("1,4");
    expect(tile_X1_Y4.getAttribute("data-ship")).not.toBe("carrier");
    const error = screen.getByText("That ship has already been placed");
    expect(error).toBeInTheDocument();
  });
  test("If click placed ship, remove from board", async () => {
    setupWithRealUI();
    triggerShipPlacement({
      ship: "carrier",
      x: 2,
      y: 1,
      direction: "horizontal",
    });
    const tile_X2_Y1 = screen.getByTestId("2,1");
    user.click(tile_X2_Y1);
    expect(tile_X2_Y1.getAttribute("data-ship")).toBe("carrier");
    user.click(tile_X2_Y1);
    await waitFor(() => screen.findByTestId("2,1"));
    const updated_tile_X2_Y1 = await screen.findByTestId("2,1");
    expect(updated_tile_X2_Y1.getAttribute("data-ship")).not.toBe("carrier");
  });
});
