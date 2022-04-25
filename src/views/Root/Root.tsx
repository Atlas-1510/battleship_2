import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../../Routes";
import GameView from "../Game";
import { OutcomeView } from "../Outcome";
import HomeView from "../Home";
import SetupView from "../Setup";

const RootView: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<HomeView />} />
      <Route path={routes.SETUP} element={<SetupView />} />
      <Route path={routes.GAME} element={<GameView />} />
      <Route path={routes.OUTCOME} element={<OutcomeView />} />
    </Routes>
  );
};

export default RootView;
