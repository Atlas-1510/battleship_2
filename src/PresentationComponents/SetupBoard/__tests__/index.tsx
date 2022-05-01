import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Board } from "../../../interfaces/Board";
import SetupBoard from "..";

import { Ship } from "../../../interfaces/Ship";
import { ShipPlacement } from "../../../interfaces/ShipPlacement";

const setup = (
  boardState?: Board,
  formState?: ShipPlacement,
  error?: string
) => {
  const initBoardState: Board = {
    recievedStrikes: [],
    ships: [],
  };

  const initFormState: ShipPlacement = {
    ship: "carrier",
    x: -1,
    y: -1,
    direction: "horizontal",
  };

  return render(
    <SetupBoard
      confirmShipPlacement={jest.fn()}
      form={formState || initFormState}
      board={boardState || initBoardState}
      removeShip={jest.fn()}
    />
  );
};

describe("GameBoard Presentation Component", () => {
  test("Renders gameboard with correct axis lengths (zero through nine, not one through 10)", () => {
    setup();
    expect(screen.getByTestId("0,0")).toBeInTheDocument();
    expect(screen.getByTestId("9,9")).toBeInTheDocument();
    expect(screen.queryByTestId("10,10")).not.toBeInTheDocument();
  });
  test("Renders placed ship on board", () => {
    const placedShip: Ship = {
      type: "carrier",
      length: 5,
      hits: [],
      alive: true,
      location: [
        {
          x: 1,
          y: 1,
        },
        {
          x: 2,
          y: 1,
        },
        {
          x: 3,
          y: 1,
        },
        {
          x: 4,
          y: 1,
        },
        {
          x: 5,
          y: 1,
        },
      ],
    };
    const boardWithShip: Board = {
      recievedStrikes: [],
      ships: [placedShip],
    };
    setup(boardWithShip);

    const tile_X1_Y1 = screen.getByTestId("1,1");
    const tile_X5_Y1 = screen.getByTestId("5,1");
    expect(tile_X1_Y1).toBeInTheDocument();
    expect(tile_X5_Y1).toBeInTheDocument();
    expect(tile_X1_Y1.getAttribute("data-ship")).toBe("carrier");
    expect(tile_X5_Y1.getAttribute("data-ship")).toBe("carrier");
  });
  test("When hover, highlights correct tiles horizontally", async () => {
    setup();
    const tile_X2_Y1 = await screen.findByTestId("2,1");
    user.hover(tile_X2_Y1);
    await waitFor(() => screen.findByTestId("2,1"));
    const updated_tile_X2_Y1 = await screen.findByTestId("2,1");
    const updated_tile_X6_Y1 = await screen.findByTestId("6,1");
    expect(updated_tile_X2_Y1.getAttribute("data-highlight")).toBe("true");
    expect(updated_tile_X6_Y1.getAttribute("data-highlight")).toBe("true");
  });
  test("When hover, highlights correct tiles vertically", async () => {
    setup(undefined, {
      ship: "carrier",
      x: -1,
      y: -1,
      direction: "vertical",
    });
    const tile_X2_Y1 = await screen.findByTestId("2,1");
    user.hover(tile_X2_Y1);
    await waitFor(() => screen.findByTestId("2,1"));
    const updated_tile_X2_Y1 = await screen.findByTestId("2,1");
    const updated_tile_X2_Y5 = await screen.findByTestId("2,5");
    expect(updated_tile_X2_Y1.getAttribute("data-highlight")).toBe("true");
    expect(updated_tile_X2_Y5.getAttribute("data-highlight")).toBe("true");
  });
  test("If ship has been placed horizontally, renders ship UI in correct tile coordinates", () => {
    setup({
      recievedStrikes: [],
      ships: [
        {
          type: "carrier",
          length: 5,
          hits: [],
          alive: true,
          location: [
            {
              x: 2,
              y: 1,
            },
            {
              x: 3,
              y: 1,
            },
            {
              x: 4,
              y: 1,
            },
            {
              x: 5,
              y: 1,
            },
            {
              x: 6,
              y: 1,
            },
          ],
        },
      ],
    });
    const shipUI = screen.getByTestId("carrier");
    expect(shipUI).toBeInTheDocument();
    expect(shipUI).toHaveStyle(
      "grid-row-start: 2; grid-row-end: 3; grid-column-start: 3; grid-column-end: 8;"
    );
  });
  test("If ship has been placed vertically, renders ship UI in correct tile coordinates", () => {
    setup({
      recievedStrikes: [],
      ships: [
        {
          type: "carrier",
          length: 5,
          hits: [],
          alive: true,
          location: [
            {
              x: 2,
              y: 1,
            },
            {
              x: 2,
              y: 2,
            },
            {
              x: 2,
              y: 3,
            },
            {
              x: 2,
              y: 4,
            },
            {
              x: 2,
              y: 5,
            },
          ],
        },
      ],
    });
    const shipUI = screen.getByTestId("carrierVertical");
    expect(shipUI).toBeInTheDocument();
    expect(shipUI).toHaveStyle(
      "grid-row-start: 2; grid-row-end: 7; grid-column-start: 3; grid-column-end: 4;"
    );
  });
});
