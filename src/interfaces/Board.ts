import { Ship } from "./Ship";

export interface Board {
  recievedStrikes: number[][];
  ships: Ship[];
}
