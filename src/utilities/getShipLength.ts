import { ShipType } from "../interfaces/Ship";

export const getShipLength = (shipType: ShipType): number => {
  switch (shipType) {
    case "carrier":
      return 5;

    case "battleship":
      return 4;

    case "cruiser":
      return 3;

    case "submarine":
      return 3;

    case "patrolBoat":
      return 2;

    default:
      throw new Error("generateShip recieved invalid shipType in switch block");
  }
};
