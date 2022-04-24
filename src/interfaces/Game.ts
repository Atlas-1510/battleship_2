import { Player } from "./Player";
import { Board } from "./Board";

export interface Game {
  playerOne: Player;
  playerTwo: Player;
  boardOne: Board;
  boardTwo: Board;
  outcome: "victory" | "defeat";
  moveCounter: number;
}
