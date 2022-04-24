import { createContext, useState, Dispatch, SetStateAction } from "react";
import { Game } from "../../interfaces/Game";
import { RootView } from "../../views/Root";

const GameContext = createContext<{
  game: Game | null;
  setGame: Dispatch<SetStateAction<Game | null>>;
} | null>(null);

export const RootContainer = () => {
  const [game, setGame] = useState<Game | null>(null);

  return (
    <GameContext.Provider value={{ game: game, setGame: setGame }}>
      <RootView />
    </GameContext.Provider>
  );
};
