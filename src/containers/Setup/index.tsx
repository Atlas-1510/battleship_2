import React, { useState } from "react";
import { SetupComponent } from "../../components/Setup";
import { Board } from "../../interfaces/Board";

export const SetupContainer = () => {
  // state for ship placements
  const [board, setBoard] = useState<Board>({
    recievedStrikes: [],
    shipPlacements: [],
  });
  return (
    <>
      <SetupComponent board={board} />
    </>
  );
};
