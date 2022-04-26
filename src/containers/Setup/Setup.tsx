import { Ship } from "../../interfaces/Ship";
import SetupPresentationComponent from "../../PresentationComponents/Setup";

const SetupContainer = () => {
  const confirmShipPlacement = (placement: {
    ship: Ship;
    x: number;
    y: number;
    direction: "horizontal" | "vertical";
  }) => {
    console.log(placement);
  };

  return (
    <>
      <SetupPresentationComponent confirmShipPlacement={confirmShipPlacement} />
    </>
  );
};
export default SetupContainer;
