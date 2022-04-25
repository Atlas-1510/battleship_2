import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { MemoryRouter, Router, Location } from "react-router-dom";
import RootContainer from "..";
import { GameContext } from "../../../contexts/Game";
import { Game } from "../../../interfaces/Game";

const setup = () => {
  return render(
    <MemoryRouter>
      <RootContainer />
    </MemoryRouter>
  );
};

describe("RootContainer", () => {
  test("On initial load, show home view", () => {
    setup();
    expect(
      screen.getByRole("button", { name: "New Game" })
    ).toBeInTheDocument();
  });
  test("Shows setup view after click on 'New Game' button", () => {
    setup();
    const startGameButton = screen.getByRole("button", {
      name: "New Game",
    });
    user.click(startGameButton);
    expect(screen.getByText("Place your ships")).toBeInTheDocument();
  });
});
