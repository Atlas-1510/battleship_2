import { Game } from "../../interfaces/Game";
import { Player } from "../../interfaces/Player";
import { Board } from "../../interfaces/Board";
export function generateGame(): Game {
  const playerOne: Player = {
    name: "Player One",
    type: "human",
    turn: false,
  };
  const playerTwo: Player = {
    name: "Player Two",
    type: "computer",
    turn: false,
  };
  const boardOne: Board = {
    recievedStrikes: [],
    shipPlacements: [],
  };
  const boardTwo: Board = {
    recievedStrikes: [],
    shipPlacements: [],
  };
  const game: Game = {
    playerOne: playerOne,
    playerTwo: playerTwo,
    boardOne: boardOne,
    boardTwo: boardTwo,
    moveCounter: 0,
  };
  return game;
}
