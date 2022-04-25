import { useNavigate } from "react-router-dom";
import { HomeView } from "../../views/Home";
import { routes } from "../../Routes";
import { useGameContext } from "../../hooks/useGameContext";
import { generateGame } from "../../utilities/generateGame";

export const HomeContainer = () => {
  const { setGame } = useGameContext();
  const navigate = useNavigate();
  const startGame = () => {
    const newGame = generateGame();
    setGame(newGame);
    navigate(routes.SETUP);
  };
  return (
    <>
      <HomeView handleStartGame={startGame} />
    </>
  );
};
