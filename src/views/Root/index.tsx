import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { GameView } from "../Game";
import { HomeView } from "../Home";
import { OutcomeView } from "../Outcome";
import { SetupView } from "../Setup";

export const RootView: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/setup" element={<SetupView />} />
      <Route path="/game" element={<GameView />} />
      <Route path="/outcome" element={<OutcomeView />} />
    </Routes>
  );
};
