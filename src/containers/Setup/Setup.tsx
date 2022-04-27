import { useGameContext } from "../../hooks/useGameContext";
import { Ship } from "../../interfaces/Ship";
import SetupPresentationComponent from "../../PresentationComponents/Setup";
import { Game } from "../../interfaces/Game";
import generateGame from "../../utilities/generateGame";

const SetupContainer = () => {
  const { game, setGame } = useGameContext();
  const confirmShipPlacement = (placement: {
    ship: Ship;
    x: number;
    y: number;
    direction: "horizontal" | "vertical";
  }) => {
    if (!game) {
      const newGame: Game = generateGame();
      setGame(newGame);
    }
  };

  return (
    <>
      <SetupPresentationComponent confirmShipPlacement={confirmShipPlacement} />
    </>
  );
};
export default SetupContainer;
