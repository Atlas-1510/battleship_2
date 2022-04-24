import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { HomeContainer } from "../../containers/Home";
import { routes } from "../../Routes";
import { GameView } from "../Game";
import { OutcomeView } from "../Outcome";
import { SetupView } from "../Setup";

export const RootView: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<HomeContainer />} />
      <Route path={routes.SETUP} element={<SetupView />} />
      <Route path={routes.GAME} element={<GameView />} />
      <Route path={routes.OUTCOME} element={<OutcomeView />} />
    </Routes>
  );
};
