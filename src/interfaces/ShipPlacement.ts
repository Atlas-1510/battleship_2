import { ShipType } from "./Ship";

export interface ShipPlacement {
  ship: ShipType | null;
  x: number;
  y: number;
  direction: "horizontal" | "vertical";
}
