import { FC } from "react";
import { Board } from "../../interfaces/Board";

interface Props {
  board: Board;
}

export const SetupComponent: FC<Props> = ({ board }) => {
  return <div>Place your ships</div>;
};
