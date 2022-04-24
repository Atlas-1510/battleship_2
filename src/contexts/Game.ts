import { createContext, Dispatch, SetStateAction } from "react";
import { Game } from "../interfaces/Game";

export const GameContext = createContext<{
  game: Game | null;
  setGame: Dispatch<SetStateAction<Game | null>>;
} | null>(null);
