export interface Ship {
  type: "carrier" | "battleship" | "cruiser" | "submarine" | "patrolBoat";
  length: number;
  hits: number[][];
  alive: boolean;
  location: number[][];
}
