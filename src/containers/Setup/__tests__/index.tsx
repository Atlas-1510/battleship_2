import { render, screen } from "@testing-library/react";
import SetupContainer from "..";
import { GameContext } from "../../../contexts/Game";
import { generateGame } from "../../../utilities/generateGame";

const mockGame = generateGame();

describe("SetupContainer", () => {
  test("Renders UI", () => {
    render(
      <>
        <GameContext.Provider value={{ game: mockGame, setGame: jest.fn() }}>
          <SetupContainer />
        </GameContext.Provider>
      </>
    );

    expect(screen.getByText("Place your ships")).toBeInTheDocument();
  });
});
