import { createContext } from "react";
import { Game } from "../interfaces/Game";

interface GameContext {
  game: Game | null;
  setGame: (g: Game) => void;
}

export const GameContext = createContext<GameContext | null>(null);
