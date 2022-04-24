import { useContext } from "react";
import { GameContext } from "../contexts/Game";

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("No game context found");
  }
  return context;
};
