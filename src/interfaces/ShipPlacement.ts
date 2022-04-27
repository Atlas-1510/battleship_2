import { Ship } from "./Ship";

export interface ShipPlacement {
  ship: Ship | null;
  x: number;
  y: number;
  direction: "horizontal" | "vertical";
}
