import { render, screen } from "@testing-library/react";
import SetupContainer from "..";
import { GameContext } from "../../../contexts/Game";

import SetupPresentationComponent from "../../../PresentationComponents/Setup";
import user from "@testing-library/user-event";
import { mocked } from "jest-mock";
import { ShipPlacement } from "../../../interfaces/ShipPlacement";
import { Game } from "../../../interfaces/Game";

// Changing mock implementation in each test using this approach
// (look at the answer from ThinkBonobo and Dayan Moreno Leon, currently second most upvoted)
// Note in the Stack Overlfow comments, need to do '(importedModule as jest.Mock).mockReturnValue(...)'
// https://stackoverflow.com/questions/45758366/how-to-change-jest-mock-function-return-value-in-each-test

// Replace the UI with a simple button that when clicked will call confirmShipPlacement
// with some kind of mocked ship placement object
jest.mock("../../../PresentationComponents/Setup", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockSetGame = jest.fn();

// shipPlacement argument is the data that is passed from the UI back to SetupContainer to be processed in confirmShipPlacement function
const setup = (gameState: any, shipPlacement: any) => {
  mocked(SetupPresentationComponent).mockImplementation((props) => (
    <button onClick={() => props.confirmShipPlacement(shipPlacement)}>
      mockSetupUI
    </button>
  ));
  return render(
    <GameContext.Provider value={{ game: gameState, setGame: mockSetGame }}>
      <SetupContainer />
    </GameContext.Provider>
  );
};

const triggerShipPlacementSubmission = () => {
  const button = screen.getByText("mockSetupUI");
  user.click(button);
};

const validCarrierPlacement: ShipPlacement = {
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
};

describe("SetupContainer", () => {
  beforeEach(() => {
    // generateGameSpy.mockClear();
    mockSetGame.mockClear();
  });
  test("Renders mock UI", () => {
    setup(null, validCarrierPlacement);
    const button = screen.getByText("mockSetupUI");
    expect(button).toBeInTheDocument();
  });

  test("If recieves valid ship placement, places ship and updates game state", () => {
    // render setup with null game state, and pass a valid ship placement
    // confirmShipPlacement will generate a game, add the ship, and call setGame with the new ship placement

    setup(null, validCarrierPlacement);
    triggerShipPlacementSubmission();
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
});
