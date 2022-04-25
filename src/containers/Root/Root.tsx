import { useState } from "react";
import { Game } from "../../interfaces/Game";
import RootView from "../../views/Root";
import { GameContext } from "../../contexts/Game";

const RootContainer = () => {
  const [game, setGame] = useState<Game | null>(null);

  return (
    <GameContext.Provider value={{ game: game, setGame: setGame }}>
      <RootView />
    </GameContext.Provider>
  );
};
export default RootContainer;
