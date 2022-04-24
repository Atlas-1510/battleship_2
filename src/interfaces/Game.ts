import { Player } from "./Player";
import { Board } from "./Board";

export interface Game {
  players: Player[];
  board: Board;
  outcome: "victory" | "defeat";
  moveCounter: number;
}
