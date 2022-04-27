import { useGameContext } from "../../hooks/useGameContext";
import { Ship } from "../../interfaces/Ship";
import SetupPresentationComponent from "../../PresentationComponents/Setup";
import { Game } from "../../interfaces/Game";
import generateGame from "../../utilities/generateGame";
import { ShipPlacement } from "../../interfaces/ShipPlacement";

const SetupContainer = () => {
  const { game, setGame } = useGameContext();

  const confirmShipPlacement = (placement: ShipPlacement) => {
    if (!game) {
      // generate a new game
      const newGame: Game = generateGame();

      // add the ship placement to the gameboard
      // Validate the placement

      // updated the game state
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
