import React, { FC } from "react";
import { ShipType } from "../../interfaces/Ship";
import {
  BattleshipContainer,
  CarrierContainer,
  CruiserContainer,
  Image,
  PatrolBoat,
  SubmarineContainer,
} from "./styles";
import battleship from "../../assets/images/battleship.png";
import carrier from "../../assets/images/carrier.png";
import cruiser from "../../assets/images/cruiser.png";
import submarine from "../../assets/images/submarine.png";
import patrolBoat from "../../assets/images/patrolBoat.png";

interface Props {
  onClick: (shipType: ShipType) => void;
  shipType: ShipType;
}

const Ship: FC<Props> = ({ shipType, onClick }) => {
  switch (shipType) {
    case "carrier":
      return (
        <CarrierContainer
          onClick={() => {
            onClick("carrier");
          }}
        >
          <Image src={carrier} alt="carrier" />
        </CarrierContainer>
      );
    case "battleship":
      return (
        <BattleshipContainer
          onClick={() => {
            onClick("battleship");
          }}
        >
          <Image src={battleship} alt="battleship" />
        </BattleshipContainer>
      );
    case "cruiser":
      return (
        <CruiserContainer
          onClick={() => {
            onClick("cruiser");
          }}
        >
          <Image src={cruiser} alt="cruiser" />
        </CruiserContainer>
      );
    case "submarine":
      return (
        <SubmarineContainer
          onClick={() => {
            onClick("cruiser");
          }}
        >
          <Image src={submarine} alt="submarine" />
        </SubmarineContainer>
      );
    case "patrolBoat":
      return (
        <PatrolBoat onClick={() => onClick("patrolBoat")}>
          <Image src={patrolBoat} alt="patrolBoat" />
        </PatrolBoat>
      );
    default:
      throw new Error("Invalid shipType in Ship UI generator");
  }
};

export default Ship;
