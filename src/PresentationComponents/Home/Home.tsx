import { FC } from "react";
import Button from "../Button";

interface Props {
  handleStartGame: React.MouseEventHandler;
}
const HomePresentationComponent: FC<Props> = ({ handleStartGame }) => {
  return (
    <div>
      <Button onClick={handleStartGame}>New Game</Button>
    </div>
  );
};
export default HomePresentationComponent;
