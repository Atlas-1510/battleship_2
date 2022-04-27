import { render, screen } from "@testing-library/react";
import SetupContainer from "..";
import { GameContext } from "../../../contexts/Game";
import user from "@testing-library/user-event";

import { ShipPlacement } from "../../../interfaces/ShipPlacement";
import { Game } from "../../../interfaces/Game";

// RENDERS SETUP CONTAINER WITH SETUP PRESENTATION COMPONENT

const mockSetGame = jest.fn();

const setupWithRealUI = (gameState: Game | null) => {
  return render(
    <GameContext.Provider value={{ game: gameState, setGame: mockSetGame }}>
      <SetupContainer />
    </GameContext.Provider>
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

describe("SetupContainer", () => {
  beforeEach(() => {
    mockSetGame.mockClear();
  });
  test("Renders actual UI", () => {
    setupWithRealUI(null);
    const title = screen.getByText("Place your ships");
    expect(title).toBeInTheDocument();
  });

  test("If recieves valid ship placement, places ship and updates game state", () => {
    setupWithRealUI(null);
    triggerShipPlacement({
      ship: {
        type: "carrier",
        length: 5,
        hits: [],
        alive: true,
        location: [],
      },
      x: 1,
      y: 1,
      direction: "horizontal",
    });
    const expectedGameState: Game = {
      playerOne: {
        name: "Player One",
        type: "human",
        turn: false,
      },
      playerTwo: {
        name: "Player Two",
        type: "computer",
        turn: false,
      },
      boardOne: {
        recievedStrikes: [],
        ships: [
          {
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
          },
        ],
      },
      boardTwo: { recievedStrikes: [], ships: [] },
      moveCounter: 0,
    };
    expect(mockSetGame).toHaveBeenCalledWith(expectedGameState);
  });

  test("Handles placement of ship when x coordinate is 0", () => {
    setupWithRealUI(null);
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
    const expectedGameState: Game = {
      playerOne: {
        name: "Player One",
        type: "human",
        turn: false,
      },
      playerTwo: {
        name: "Player Two",
        type: "computer",
        turn: false,
      },
      boardOne: {
        recievedStrikes: [],
        ships: [
          {
            type: "carrier",
            length: 5,
            hits: [],
            alive: true,
            location: [
              {
                x: 0,
                y: 1,
              },
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
            ],
          },
        ],
      },
      boardTwo: { recievedStrikes: [], ships: [] },
      moveCounter: 0,
    };
    expect(mockSetGame).toHaveBeenCalledWith(expectedGameState);
  });

  test("Handles placement of ship when y coordinate is 0", () => {
    setupWithRealUI(null);
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
      direction: "vertical",
    });
    const expectedGameState: Game = {
      playerOne: {
        name: "Player One",
        type: "human",
        turn: false,
      },
      playerTwo: {
        name: "Player Two",
        type: "computer",
        turn: false,
      },
      boardOne: {
        recievedStrikes: [],
        ships: [
          {
            type: "carrier",
            length: 5,
            hits: [],
            alive: true,
            location: [
              {
                x: 1,
                y: 0,
              },
              {
                x: 1,
                y: 1,
              },
              {
                x: 1,
                y: 2,
              },
              {
                x: 1,
                y: 3,
              },
              {
                x: 1,
                y: 4,
              },
            ],
          },
        ],
      },
      boardTwo: { recievedStrikes: [], ships: [] },
      moveCounter: 0,
    };
    expect(mockSetGame).toHaveBeenCalledWith(expectedGameState);
  });

  test("If place ship off board horizontally, render error to user", async () => {
    setupWithRealUI(null);
    triggerShipPlacement({
      ship: {
        type: "carrier",
        length: 5,
        hits: [],
        alive: true,
        location: [],
      },
      x: 8,
      y: 1,
      direction: "horizontal",
    });

    const error = await screen.findByText(
      "Please place the ship entirely on the board"
    );
    expect(error).toBeInTheDocument();
  });

  test("If place ship off board vertically, render error to user", async () => {
    setupWithRealUI(null);
    triggerShipPlacement({
      ship: {
        type: "carrier",
        length: 5,
        hits: [],
        alive: true,
        location: [],
      },
      x: 1,
      y: 8,
      direction: "vertical",
    });

    const error = await screen.findByText(
      "Please place the ship entirely on the board"
    );
    expect(error).toBeInTheDocument();
  });

  test("If place ship that overlaps another ship, render error to user", async () => {
    const initialGameState: Game = {
      playerOne: {
        name: "Player One",
        type: "human",
        turn: false,
      },
      playerTwo: {
        name: "Player Two",
        type: "computer",
        turn: false,
      },
      boardOne: {
        recievedStrikes: [],
        ships: [
          {
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
          },
        ],
      },
      boardTwo: { recievedStrikes: [], ships: [] },
      moveCounter: 0,
    };
    setupWithRealUI(initialGameState);
    triggerShipPlacement({
      ship: {
        type: "battleship",
        length: 4,
        hits: [],
        alive: true,
        location: [],
      },
      x: 2,
      y: 0,
      direction: "vertical",
    });
    const error = await screen.findByText("Ships cannot overlap each other");
    expect(error).toBeInTheDocument();
  });
});
