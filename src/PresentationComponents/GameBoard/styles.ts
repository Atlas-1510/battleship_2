import styled from "styled-components";
import carrier from "../../assets/images/carrier.png";
import carrierVertical from "../../assets/images/carrierVertical.png";
import battleship from "../../assets/images/battleship.png";
import battleshipVertical from "../../assets/images/battleshipVertical.png";
import cruiser from "../../assets/images/cruiser.png";
import cruiserVertical from "../../assets/images/cruiserVertical.png";
import patrolBoat from "../../assets/images/patrolBoat.png";
import patrolBoatVertical from "../../assets/images/patrolBoatVertical.png";
import submarine from "../../assets/images/submarine.png";
import submarineVertical from "../../assets/images/submarineVertical.png";

export const BoardContainer = styled.div`
  width: 50vw;
  height: 50vw;
`;

export const TileGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  background-color: black;
  border: 1px solid black;
  gap: 1px;
`;

export const GridShipIndicator = styled.div`
  background-position: center;
  background-size: 100% 100%;
  pointer-events: none;
`;

export const CarrierGridIcon = styled(GridShipIndicator)`
  background-image: url(${carrier});
`;

export const VerticalCarrierGridIcon = styled(GridShipIndicator)`
  background-image: url(${carrierVertical});
`;

export const BattleshipGridIcon = styled(GridShipIndicator)`
  background-image: url(${battleship});
`;

export const VerticalBattleshipGridIcon = styled(GridShipIndicator)`
  background-image: url(${battleshipVertical});
`;

export const CruiserGridIcon = styled(GridShipIndicator)`
  background-image: url(${cruiser});
`;

export const VerticalCruiserGridIcon = styled(GridShipIndicator)`
  background-image: url(${cruiserVertical});
`;

export const PatrolBoatGridIcon = styled(GridShipIndicator)`
  background-image: url(${patrolBoat});
`;

export const VerticalPatrolBoatGridIcon = styled(GridShipIndicator)`
  background-image: url(${patrolBoatVertical});
`;

export const SubmarineGridIcon = styled(GridShipIndicator)`
  background-image: url(${submarine});
`;

export const VerticalSubmarineGridIcon = styled(GridShipIndicator)`
  background-image: url(${submarineVertical});
`;
