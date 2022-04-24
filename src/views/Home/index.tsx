import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";

interface Props {
  handleStartGame: React.MouseEventHandler;
}

export const HomeView: FC<Props> = ({ handleStartGame }) => {
  // on button click, programatically change location
  return (
    <div>
      <Button onClick={handleStartGame}>New Game</Button>
    </div>
  );
};
