import { FC } from "react";
import { Button } from "../Button";

interface Props {
  handleStartGame: React.MouseEventHandler;
}

export const HomePresentationComponent: FC<Props> = ({ handleStartGame }) => {
  return (
    <div>
      <Button onClick={handleStartGame}>New Game</Button>
    </div>
  );
};
