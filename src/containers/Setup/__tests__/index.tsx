import { render, screen } from "@testing-library/react";
import SetupContainer from "..";
import { GameContext } from "../../../contexts/Game";
import * as generateGame from "../../../utilities/generateGame";
import SetupPresentationComponent from "../../../PresentationComponents/Setup";
import user from "@testing-library/user-event";
import { mocked } from "jest-mock";

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

// in the module that is being tested, this function is called as 'generateGame()'
// but in the tests, to spy on it, it needed to be imported as an object with a method
// so to call it (to get a blank game instance) use generateGame.default()
const generateGameSpy = jest.spyOn(generateGame, "default");

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

describe("SetupContainer", () => {
  beforeEach(() => {
    generateGameSpy.mockClear();
    mockSetGame.mockClear();
  });
  test("Renders mock UI", () => {
    setup(null, 12345);
    const button = screen.getByText("mockSetupUI");
    expect(button).toBeInTheDocument();
    user.click(button);
  });

  // This test is testing implementation, not functionality (checking if generateGame is called once)
  // However, have kept it for future reference in case I need to spy on an imported function again for some reason.
  test("Given no game context, calls generateGame function when ship placement is submitted", () => {
    setup(null, 12345);
    const button = screen.getByText("mockSetupUI");
    user.click(button);
    expect(generateGameSpy.mock.calls.length).toBe(1);
    expect(mockSetGame.mock.calls.length).toBe(1);
    const newGame = generateGame.default();
    expect(mockSetGame).toHaveBeenCalledWith(newGame);
  });
});
