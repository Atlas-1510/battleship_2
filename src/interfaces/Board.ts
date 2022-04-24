import { Ship } from "./Ship";

export interface Board {
  recievedStrikes: number[][];
  shipPlacements: Ship[];
}
