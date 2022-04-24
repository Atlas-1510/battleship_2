import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeView } from "../../views/Home";
import { routes } from "../../Routes";

export const HomeContainer = () => {
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
