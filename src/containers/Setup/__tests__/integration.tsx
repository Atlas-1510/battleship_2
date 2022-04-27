import { render, screen } from "@testing-library/react";
import SetupContainer from "..";
import { GameContext } from "../../../contexts/Game";
import user from "@testing-library/user-event";

import { ShipPlacement } from "../../../interfaces/ShipPlacement";
import { Game } from "../../../interfaces/Game";

// RENDERS SETUP CONTAINER WITH SETUP PRESENTATION COMPONENT

const mockSetGame = jest.fn();

const setupWithRealUI = (gameState: any) => {
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

  test("If recieves ship placement that is not fully on the board, render error to user", async () => {
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
});
