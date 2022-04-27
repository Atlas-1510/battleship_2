import { useNavigate } from "react-router-dom";
import { routes } from "../../Routes";
import { useGameContext } from "../../hooks/useGameContext";
import generateGame from "../../utilities/generateGame";
import HomePresentationComponent from "../../PresentationComponents/Home";

const HomeContainer = () => {
  const { setGame } = useGameContext();
  const navigate = useNavigate();
  const startGame = () => {
    const newGame = generateGame();
    setGame(newGame);
    navigate(routes.SETUP);
  };
  return (
    <>
      <HomePresentationComponent handleStartGame={startGame} />
    </>
  );
};

export default HomeContainer;
