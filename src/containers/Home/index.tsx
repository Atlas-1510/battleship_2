import { useNavigate } from "react-router-dom";
import { HomeView } from "../../views/Home";
import { routes } from "../../Routes";
import { useGameContext } from "../../hooks/useGameContext";

export const HomeContainer = () => {
  const { game, setGame } = useGameContext();
  const navigate = useNavigate();
  const startGame = () => {
    navigate(routes.SETUP);
  };
  return (
    <>
      <HomeView handleStartGame={startGame} />
    </>
  );
};
