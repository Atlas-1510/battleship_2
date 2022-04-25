import { useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import { Board } from "../../interfaces/Board";
import { SetupPresentationComponent } from "../../PresentationComponents/Setup";

export const SetupContainer = () => {
  // state for ship placements
  const [board, setBoard] = useState<Board>({
    recievedStrikes: [],
    ships: [],
  });

  // use game context to get game and assign board state
  const { game, setGame } = useGameContext();

  return (
    <>
      <SetupPresentationComponent />
    </>
  );
};
