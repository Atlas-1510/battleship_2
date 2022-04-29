import { render, screen } from "@testing-library/react";
import { Board } from "../../../interfaces/Board";
import user from "@testing-library/user-event";
import SetupPresentationComponent from "..";
import generateGame from "../../../utilities/generateGame";
import { ShipPlacement } from "../../../interfaces/ShipPlacement";
import { Ship } from "../../../interfaces/Ship";

const initBoardState: Board = {
  recievedStrikes: [],
  ships: [],
};

const initFormState: ShipPlacement = {
  x: -1,
  y: -1,
  direction: "horizontal",
  ship: "carrier",
};

const setup = (boardState?: Board, error?: string) => {
  const initBoardState: Board = {
    recievedStrikes: [],
    ships: [],
  };

  return render(
    <SetupPresentationComponent
      board={boardState || initBoardState}
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

  test("If error, renders error to user", () => {
    setup(undefined, "some error text");
    expect(screen.getByText("some error text")).toBeInTheDocument();
  });
});
