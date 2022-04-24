import { FC } from "react";
import { Link } from "react-router-dom";

export const HomeView: FC = () => {
  return (
    <div>
      <Link to="/setup">New Game</Link>
    </div>
  );
};
