import { ShipType } from "./Ship";

export interface ShipPlacement {
  ship: ShipType;
  x: number;
  y: number;
  direction: "horizontal" | "vertical";
}
