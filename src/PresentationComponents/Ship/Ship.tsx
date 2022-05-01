import React, { FC } from "react";
import { ShipType } from "../../interfaces/Ship";
import {
  BattleshipContainer,
  CarrierContainer,
  CruiserContainer,
  Image,
  PatrolBoat,
  PlacedContainer,
  SelectedContainer,
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
  selected: boolean;
  placed: boolean;
}

const Ship: FC<Props> = ({ shipType, onClick, selected, placed }) => {
  const generateShipByType = () => {
    switch (shipType) {
      case "carrier":
        return (
          <CarrierContainer>
            <Image src={carrier} alt="carrier" />
          </CarrierContainer>
        );
      case "battleship":
        return (
          <BattleshipContainer>
            <Image src={battleship} alt="battleship" />
          </BattleshipContainer>
        );
      case "cruiser":
        return (
          <CruiserContainer>
            <Image src={cruiser} alt="cruiser" />
          </CruiserContainer>
        );
      case "submarine":
        return (
          <SubmarineContainer>
            <Image src={submarine} alt="submarine" />
          </SubmarineContainer>
        );
      case "patrolBoat":
        return (
          <PatrolBoat>
            <Image src={patrolBoat} alt="patrolBoat" />
          </PatrolBoat>
        );
      default:
        throw new Error("Invalid shipType in Ship UI generator");
    }
  };

  if (placed) {
    return (
      <PlacedContainer data-testid={shipType} data-placed={placed}>
        {generateShipByType()}
      </PlacedContainer>
    );
  } else if (selected) {
    return (
      <SelectedContainer data-testid={shipType}>
        {generateShipByType()}
      </SelectedContainer>
    );
  } else {
    return (
      <div data-testid={shipType} onClick={() => onClick(shipType)}>
        {generateShipByType()}
      </div>
    );
  }
};

export default Ship;
