// NOTE: If adding/removing shipTypes make sure you replicate the same change in the ShipType type below
// TODO: Figure out how to tie the shipTypes array and the ShipType together.

import { Coordinate } from "./Coordinate";

export const shipTypesArray = [
  "carrier",
  "battleship",
  "cruiser",
  "submarine",
  "patrolBoat",
];

export type ShipType =
  | "carrier"
  | "battleship"
  | "cruiser"
  | "submarine"
  | "patrolBoat";

export interface Ship {
  type: ShipType;
  length: number;
  hits: number[][];
  alive: boolean;
  location: Coordinate[];
}
